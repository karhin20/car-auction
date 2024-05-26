import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../components/AdminDefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../../redux/actions/carsActions';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom'
import numeral from 'numeral';
import { Popconfirm } from 'antd';
import { deleteCar } from '../../redux/actions/carsActions';

function AdminHome() {
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertReducer);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch, refresh]);

  const handleDelete = (carId) => {
    dispatch(deleteCar(carId))
      .then(() => {
        setRefresh(prev => !prev); 
      })
      .catch(error => {
        console.error('Failed to delete the car:', error);
      });
  };

  return (
    <>
      <DefaultLayout>
        {loading && <Loader />}
  
        <div className="container">
          <div className="row">
            {cars.map((car) => (
              <div className="col-md-4 d-flex" key={car._id}>
                <div className="card bs1 bg-transparent mb-4 flex-column">
                  <img src={car.images.length > 0 ? car.images[0].url : ''} className="card-img-top mt-3" alt={car.name} />
                  <div className="card-content d-flex align-items-center justify-content-between">
                    <div className="card-body text-left">
                      <div className="d-flex">
                        <i className="ri-car-line"></i>
                        <p className="card-title">Brand: {car.name}</p>
                      </div>
                      <div className="d-flex">
                        <i className="ri-car-fill"></i>
                        <p>Model: {car.type}</p>
                      </div>
                      <div className="d-flex">
                        <i className="ri-wallet-3-line"></i>
                        <p className="card-text">Starting Price: <strong>₵{numeral(car.startingPrice).format('0,0.00')}</strong></p>
                      </div>
                      <div className="d-flex">
                        <i className="ri-calendar-event-line"></i>
                        <p className="card-text">Auction End Date: <strong>{car.endDate}</strong></p>
                      </div>
                    </div>
                    <div className="adminbutton">
                      <Link style={{ textDecoration: 'none' }} to={`/admin/editcar/${car._id}`} title="Edit Car">
                        <h4 style={{ color: "blue", cursor: "pointer", textDecoration: 'none' }}><i className="ri-edit-line"></i></h4>
                      </Link>
                      <Popconfirm
                        title="Are you sure to delete this car?"
                        onConfirm={() => handleDelete(car._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <h4 style={{ color: "red", cursor: "pointer", textDecoration: 'none' }}><i className="ri-delete-bin-7-line"></i></h4>
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

export default AdminHome;