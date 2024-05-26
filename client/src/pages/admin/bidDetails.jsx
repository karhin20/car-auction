import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBookings } from '../../redux/actions/bookingActions';
import { getAllUsers } from '../../redux/actions/userInfoActions';
import { getAllCars } from '../../redux/actions/carsActions';
import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import AdminDefaultLayout from '../../components/AdminDefaultLayout';
import moment from "moment";
import numeral from 'numeral';
import CustomFooter from '../../components/Footer';

function BidDetails() {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.biddingReducer.bookings);
    const users = useSelector(state => state.usersReducer.users);
    const cars = useSelector(state => state.carsReducer.cars);
    const [carDetail, setCarDetail] = useState(null);
    const [carBids, setCarBids] = useState([]);
    const { carid } = useParams();

    useEffect(() => {
        dispatch(getAllBookings());
        dispatch(getAllUsers());
        dispatch(getAllCars());
    }, [dispatch]);

    useEffect(() => {
        if (cars.length > 0) {
            const car = cars.find(car => car._id === carid);
            if (car) {
                setCarDetail(car);
            } else {
                console.error("Car not found");
            }
        }
    }, [cars, carid]);

    useEffect(() => {
        if (bookings.length > 0 && users.length > 0) {
            const bidsForCar = bookings.filter(booking => booking.car && booking.car._id === carid);
            const enrichedBids = bidsForCar.map(booking => {
                const userDetail = users.find(user => user._id === booking.user);
                return { userDetail, bidAmount: booking.bidAmount, createdAt: booking.createdAt };
            });

            enrichedBids.sort((a, b) => b.bidAmount - a.bidAmount);
            setCarBids(enrichedBids);

        }
    }, [bookings, users, carid]);

    return (
        <AdminDefaultLayout>
            <div className="text-center">
                {carDetail ? (
                    <div>
                        <h1>Bid Details for {carDetail.name}</h1>
                        <img src={carDetail.images.length > 0 ? carDetail.images[0].url : ''} alt="Auctioned Cars in Ghana" style={{ width: '400px', height: 'auto' }} />
                    </div>
                ) : (
                    <h3>Loading car details...</h3>
                )}
                {carBids.length === 0 ? (
                    <div className="text-center">
                        <h3>No bids available for this car.</h3>
                    </div>
                ) : (
                    <Row justify="center">
                        {carBids.map((bid, index) => (
                            <Col key={index} xs={24} lg={8} sm={24} style={{ padding: "10px" }}>
                                <div style={{ padding: "20px" }} className="card bs1 bg-transparent mb-4 flex-column">
                                    <h6>Bidder's Name:<b> {bid.userDetail?.username} {bid.userDetail?.lastname}</b></h6>
                                    <h6>Phone Number:<b> {bid.userDetail?.phone}</b></h6>
                                    <h6>Bid Amount: <b>₵{numeral(bid.bidAmount).format('0,0.00')}</b></h6>
                                    <h6>Date of Bidding: <b>{moment(bid.createdAt).format('DD MMM yyyy')}</b></h6>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>

             <CustomFooter />
        </AdminDefaultLayout>
    );
}

export default BidDetails;