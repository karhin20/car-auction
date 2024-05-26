import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Divider, Checkbox, message} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsActions';
import DefaultLayout from '../components/DefaultLayout';
import Loader from '../components/Loader';
import { bookcar } from '../redux/actions/bookingActions'
import numeral from 'numeral';
import { Carousel } from 'antd';



function BookingCar() {
  const { carid } = useParams();
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertReducer);
  const [car, setCar] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (cars.length > 0) {
      const selectedCar = cars.find(c => c._id === carid);
      if (selectedCar) {
        setCar(selectedCar);
      }
    }
  }, [cars, carid]);

  const handleBidAmountChange = (e) => {
    const amount = e.target.value;
    setBidAmount(amount);
    setEnteredAmount(amount); 
  };
  const handleTermsAcceptance = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const Bidplaced = () => {
  
    if (bidAmount >= parseInt(car.startingPrice) && termsAccepted) {
      const userData = JSON.parse(localStorage.getItem('user'));
      const user = userData ? userData.user : null;
      const userId = user ? user.id : null;
      const reqObj = {
        user: userId,
        car: car._id,
        bidAmount: bidAmount,
      };
      dispatch(bookcar(reqObj));
      setBidAmount(0);
      setEnteredAmount('');
      setTermsAccepted(false);
    } else {
      message.error('Please enter a bid amount greater than the Starting Price and accept the Terms and Conditions.');
    }
  };

  return (
    <DefaultLayout>
      {loading && <Loader />}
      <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh', paddingTop: "20px"}}>
        <Col lg={{ span: 10 }} xs={24}>
        {car && (
              <Carousel autoplay>
                  {car.images.map((pic, index) => (
                      <div key={index}>
                          <img style={{ borderRadius: 10, width: '100%' }} src={pic.url} alt={`pic ${index}`} className='carimg2 bs1' />
                      </div>
                  ))}
              </Carousel>
                )}

                {car && (
                    <h4 className='text-center' style={{ marginTop: '10px', fontWeight: 'bold' }}><i className="ri-car-fill"></i> {car.name}</h4>
                )}

                {car && (
                    <h5 className='text-center' style={{ marginTop: '10px' }}><i className="ri-phone-line"></i> Call the Auctioneer: {car.adminPhone}</h5>
                )}
           </Col>
        <Col lg={{ span: 10, offset: 2 }} sm={24} xs={24}>
          <Divider type='horizontal' dashed style={{ borderTop: '2px black', padding: '0 0px 0 30px',fontSize: 19 }}><em>Vehicle's Info</em></Divider>
          <div className='t' style={{ padding: '0 0px 0 40px ', fontSize: 18}}>
              
              {car && <p><i className="ri-car-fill" > </i> Brand: {car.name}</p>}

            <div className="d-flex">
              <i className="ri-car-line" style={{ marginRight: '5px' }}></i>
              {car && <p> Model: {car.type}</p>}
            </div>
          <div className="d-flex">
            <i className="ri-map-pin-line"style={{ marginRight: '5px' }}></i>
            {car && <p> Location: {car.location}</p>}
          </div> 

          <div className="d-flex">
            <i className="ri-calendar-event-line" style={{ marginRight: '5px' }}></i>
            {car && <p>Auction End Date: {car.endDate}</p>}
          </div>  

          <div className="d-flex" style={{padding: '20px 0px 20px 0'}}>
              <i className="ri-wallet-3-line" style={{ marginRight: '5px' }}></i>
              {car && <p>Starting Price: ₵{numeral(car.startingPrice).format('₵0,0.00')}</p>}
            </div>
          </div>
          <div className='text-right'>
            <Divider type='horizontal' dashed style={{ borderTop: '2px black', padding: '0 0px 0 30px',fontSize: 19 }}><em>Place Your Bid</em></Divider>
 
          </div>
          <div className='text-right' style={{ padding: '0 30px 0 0' }}>
            <div>
              <div style={{padding: '10px 0px 10 0px',fontSize: 16 }}>
                <p>Enter Amount Here</p><input type="number" value={bidAmount} onChange={handleBidAmountChange} />
              </div>
              <div style={{ padding: '15px 0px 0px 0px', fontSize: 14 }}>
                <p>Entered Amount: ₵{numeral(enteredAmount).format('0,0.00')}</p>
            </div>

              <div style={{padding: '10px 0px 10px 0px',fontSize: 14 }}>
                <Checkbox checked={termsAccepted} onChange={handleTermsAcceptance}>
                  <b>Agree to terms and conditions</b> <em>(check the box)</em>
                </Checkbox>
              </div>
            </div>
            <div style={{padding: '0px 0px 20px 0px'}}>
              <button className='btn1' onClick={Bidplaced}>Place Bid</button>
            </div>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;