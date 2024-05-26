const dotenv = require('dotenv');
dotenv.config();

const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB connection successful");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
}

connectDB();
module.exports = mongoose;