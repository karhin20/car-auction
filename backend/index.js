const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

const dbConnection = require('./db.js');
const cloudinary = require("./services/cloudinary.js")
const CarModel = require('./schema/carModel.js');
const UserInfoModel = require('./schema/userInfoModel.js');
const BookingModel = require('./schema/bookingModel.js');


app.use(cors(
  {
    origin: ["https://car-auction-gh.vercel.app"],
    methods: ["POST" , "GET", "DELETE"],
    credentials: true
  }
))

app.get("/", (req , res) => {
  res.json("Hello")
})

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://car-auction-gh.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/api/cars/getAllCars', async (req, res) => {
  try {
    const cars = await CarModel.find();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/api/cars/addcar", async (req, res) => {

  try {
    let images = [...req.body.images];
    let imagesBuffer = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], { 
        folder: "car-auction"
      });
      imagesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url
      });
    }
    req.body.images = imagesBuffer;

    const newCar = new CarModel(req.body);
    await newCar.save();
    res.send("Car added successfully");
  } catch (error) {
    console.error("Error adding car:", error);
    return res.status(400).json(error);
  }
});




app.post("/api/cars/editcar", async (req, res) => {
  try {
    const car = await CarModel.findById(req.body.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Update car details
    car.username = req.body.username;
    car.type = req.body.type;
    car.adminPhone = req.body.adminPhone;
    car.location = req.body.location;
    car.startingPrice = req.body.startingPrice;
    car.endDate = req.body.endDate;

    // Handle image updates
    if (req.body.images && req.body.images.length > 0) {
      // Delete old images from Cloudinary
      const oldImgIds = car.images.map(image => image.public_id);
      for (const imgId of oldImgIds) {
        await cloudinary.uploader.destroy(imgId);
      }

      // Upload new images to Cloudinary
      let imagesBuffer = [];
      for (let i = 0; i < req.body.images.length; i++) {
        const result = await cloudinary.uploader.upload(req.body.images[i], { 
          folder: "car-auction"
        });
        imagesBuffer.push({
          public_id: result.public_id,
          url: result.secure_url
        });
      }
      car.images = imagesBuffer;
    }

    await car.save(); 
    res.send("Car details updated successfully");
  } catch (error) {
    console.error("Error updating car:", error);
    return res.status(400).json({ error: 'Error updating car' });
  }
});



app.delete("/api/cars/deletecar/:id", async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Access the publicId property correctly from the images array
    const imgIds = car.images.map(image => image.public_id);
    
    // Delete images from cloudinary using the imgIds array
    for (const imgId of imgIds) {
      await cloudinary.uploader.destroy(imgId);
    }

    // Delete related bookings and the car
    await BookingModel.deleteMany({ car: req.params.id });
    await CarModel.findByIdAndDelete(req.params.id);

    res.send("Car and related bookings deleted successfully");
  } catch (error) {
    console.error("Error deleting car and bookings:", error);
    return res.status(400).json({ error: 'Error deleting car and bookings' });
  }
});



app.post('/api/users/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
      const user = await UserInfoModel.findOne({ phone });
      if (!user) {
          return res.status(400).json({ message: 'Invalid phone or password' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid phone or password' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: '1h'
      });

      res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});




app.post('/api/users/logout', (req, res) => {
  // Assuming the authentication token is stored in a cookie named 'token'
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});



app.post('/api/users/register', async (req, res) => { 
  const { username, lastname, password, phone } = req.body;

  try {
    const newuser = new UserInfoModel({ username, lastname, password, phone }); 
    await newuser.save();
    res.send("Registration Successful");
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/admin/register', async (req, res) => { 
  const { username, lastname, password, phone, adminCode } = req.body;

  try {
  
    if (adminCode === process.env.ADMIN_REGISTRATION_KEY) {
      const newuser = new UserInfoModel({ username, lastname, password, phone, role: 'admin' }); 
      await newuser.save();
      res.send("Admin Registration Successful");
    } else {
      res.status(400).json({ error: 'Invalid admin code. Admin registration failed.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


function authenticateAdmin(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    console.log('User:', user); // Add this line to log the user details

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = user;
    next();
  });
}


// Secure the /api/users/getAllUsers endpoint with JWT token authentication and admin role check
app.get('/api/users/getAllUsers', authenticateAdmin, async (req, res) => {
  try {
    const users = await UserInfoModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/users/checkPhone/:phone', async (req, res) => {
  const phone = req.params.phone;

  try {
    const existingUser = await UserInfoModel.findOne({ phone: phone });

    if (existingUser) {
      res.json({ exists: true }); 
    } else {
      res.json({ exists: false }); 
    }
  } catch (error) {
    console.error('Error checking phone number existence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.post('/api/generate-otp', async (req, res) => {
  let { phone } = req.body;
  if (phone.startsWith('0')) {
    phone = '233' + phone.substring(1);
  }

  
  const otpCode = "123456";  

  res.json({ code: '1000', message: 'OTP generated successfully', otpCode: otpCode });
});

app.post('/api/verify-otp', async (req, res) => {

  let { phone, otp } = req.body;

  if (phone.startsWith('0')) {
    phone = '233' + phone.substring(1);
  }

  if (otp === "123456") {
    res.json({ code: '1100', message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ code: '1101', message: 'OTP verification failed' });
  }
});



app.post("/api/bookings/bookcar", async (req, res) => {
  try {
    const newbooking = new BookingModel(req.body);
    await newbooking.save();

    const car = await CarModel.findOne({ _id: req.body.car });
    car.bids.push(req.body.bidAmount);
    await car.save();

    res.send('Your bidding is successful');
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


app.get('/api/bookings/getAllBookings', async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate('car');
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(port, () => {
  console.log(`Node.js server has started on port ${port}`);
});