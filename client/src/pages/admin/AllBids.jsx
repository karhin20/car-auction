import React, { useEffect } from 'react';
import AdminDefaultLayout from '../../components/AdminDefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../../redux/actions/carsActions';
import { Row, Col, Button } from "antd";
import { Link } from 'react-router-dom';
import moment from "moment";
import numeral from 'numeral';
import CustomFooter from '../../components/Footer';

function ReceivedBids() {
    const dispatch = useDispatch();
    const cars = useSelector(state => state.carsReducer.cars);

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    return (
        <AdminDefaultLayout>
            <h1 className="text-center mt-2" style={{padding: "15px 0 0 0" }}>Received Bids Overview</h1>
            <Row justify='center' gutter={16}>
                {cars && cars.length > 0 ? (
                    cars.map(car => (
                        <Col lg={16} sm={24} key={car._id} className="mb-4">
                            <div className="car-bid-card">
                                <Row gutter={16} className="bs1 m-2 text-left">
                                    <Col lg={12} sm={24} className="custom-col">
                                        <img style={{ borderRadius: 10,  width: '100%',  }} src={car.images.length > 0 ? car.images[0].url : ''} alt={car.name} />
                                    </Col>
                                    <Col lg={10} sm={24}  style={{ padding: "0 0 0 50px" }} className="custom-col">
                                        <h3 style={{ padding: "10px 0 0 0" }}><i className="ri-car-line"></i>  {car.name}</h3>
                                        <p><i className="ri-car-fill"></i>  Model: {car.type}</p>
                                        <p><i className="ri-calendar-event-fill"></i> End Date: {moment(car.endDate).format('DD MMM yyyy')}</p>
                                        <div>  
                                            <h4 style={{ color: "red", padding: "5px 0 0 0" }}><i className="ri-wallet-3-line"></i> BIDS</h4>
                                            <p>Bids Count: {car.bids ? car.bids.length : 0}</p>
                                            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                                {car.bids && car.bids.length > 0 ? (
                                                    [...car.bids].sort((a, b) => b - a).map((bid, index) => (
                                                        <p key={index}><b>₵{numeral(bid).format('0,0.00')}</b></p>
                                                    ))
                                                ) : (
                                                    <p>No bids received.</p>
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ margin: '10px 0 10px 0', textAlign: 'right'  }}>
                                            <Link to={`/admin/bid-details/${car._id}`}>
                                                <Button className="btn1 bs1" type="btn1">Bid Details</Button>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))
                ) : (
                    <Col span={24}>
                        <p>No cars found.</p>
                    </Col>
                )}
            </Row>

            <div>
                <CustomFooter/>
            </div>
        </AdminDefaultLayout>
    );
}

export default ReceivedBids;