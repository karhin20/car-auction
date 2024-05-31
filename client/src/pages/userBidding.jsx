import { Carousel } from 'antd';
import React, { useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBookings } from '../redux/actions/bookingActions';
import { Row, Col } from "antd";
import moment from "moment";
import numeral from 'numeral';
import CustomFooter from '../components/Footer';
import { useParams } from 'react-router-dom';

function UserBids() {
    const dispatch = useDispatch();
    const { bookings } = useSelector(state => state.biddingReducer);
    const { userid } = useParams();
    const userId = userid
    console.log('userId')

    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch]);

    return (
        <DefaultLayout>
            <h1 className="text-center mt-2">My Bids</h1>

            <Row justify='center' gutter={16} style={{paddingBottom: "30px"}}>
                <Col lg={16} sm={24}>
                    {bookings && bookings.length > 0 ? (
                        bookings.filter(booking => {
                            return booking.user === userId;
                        }).map(booking => (
                            booking.car && (
                                <Row gutter={6} className="bs1 m-2 text-left" key={booking._id} style={{paddingBottom: "20px"}}>
                                    <Col lg={9} sm={24} className="custom-col" style={{ paddingLeft: "20px", paddingTop: "20px" }}>
                                        <div>
                                            <h5><i className="ri-car-fill"></i><b>{booking.car.name}</b></h5>
                                        </div>
                                        <p><i className="ri-car-line"></i> Model: <b>{booking.car.type}</b></p>
                                        <p><i className="ri-map-pin-line"></i> Location: <b>{booking.car.location}</b></p>
                                        <p><i className="ri-phone-line"></i> Auctioneer's Phone: <b>{booking.car.adminPhone}</b></p>
                                    </Col>
                                    <Col lg={8} sm={24} className="custom-col" style={{ paddingLeft: "20px", paddingTop: "40px" }}>
                                        <div>
                                            <p><i className="ri-calendar-event-line"></i> Date of Bidding: <b>{moment(booking.createdAt).format('DD MMM yyyy')}</b></p>
                                        </div>
                                        <p><i className="ri-wallet-3-line"></i> Starting Price: <b> ₵{numeral(booking.car.startingPrice).format('0,0.00')}</b></p>
                                        <p><i className="ri-wallet-3-line"></i> Bid Amount: <b><em>₵{numeral(booking.bidAmount).format('0,0.00')}</em></b></p>
                                    </Col>
                                    <Col lg={5} sm={24} className="custom-col">
                                        <Carousel autoplay>
                                            {booking.car.images.map((image, index) => (
                                                <div key={index}>
                                                    <img style={{ borderRadius: 10, width: '100%' }} src={image.url} alt="Auction Cars" className="p-2" />
                                                </div>
                                            ))}
                                        </Carousel>
                                    </Col>
                                </Row>
                            )
                        ))
                    ) : (
                        <p>No bids found for you yet.</p>
                    )}
                </Col>
            </Row>
            <div>
                <CustomFooter/>
            </div>
        </DefaultLayout>
    );
}

export default UserBids;