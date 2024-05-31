import React, { useState } from 'react';
import AdminDefaultLayout from '../../components/AdminDefaultLayout';
import { addCar } from '../../redux/actions/carsActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import numeral from 'numeral';
import CustomFooter from '../../components/Footer';


function AddCars() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertReducer);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [endDate, setEndDate] = useState('');
  const [images, setImages] = useState([]);


const handleImages = (e) => {
  const files = Array.from(e.target.files);
  const newImages = [];
  files.forEach(file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      newImages.push(reader.result);
      if (newImages.length === files.length) {
        setImages(newImages);
      }
    };
  });
};


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValues = {
      name,
      type,
      adminPhone,
      image,
      location,
      startingPrice: Number(startingPrice),
      endDate,
      images
    };
    console.log(updatedValues)
    dispatch(addCar(updatedValues));
  };

  return (
    <AdminDefaultLayout>
      {loading && <Loader />}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Car Brand</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="type">Car Model</label>
          <input type="text" className="form-control" id="type" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="adminPhone">Administrator's Phone Number</label>
          <input type="text" className="form-control" id="adminPhone" value={adminPhone} onChange={(e) => setAdminPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">ImageUrl</label>
          <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Car Location</label>
          <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Auction End Date</label>
          <input type="text" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <p>Enterd Starting Price: ₵{numeral(startingPrice).format('0,0.00')}</p>
          <label htmlFor="startingPrice">Starting Price</label>
          <input type="number" className="form-control" id="startingPrice" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Auction End Date</label>
          <input type="text" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="formExample">Upload Images</label>
          <input type="file" className="form-control-file" id="formupload" name="images" onChange={handleImages} multiple required/>
        </div>
        <div>
          <img  className="img-fluid" alt=""/>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
      </form>
      <div>
        <CustomFooter/>
      </div>
    </AdminDefaultLayout>
  );
}

export default AddCars;