import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsActions';
import Loader from '../components/Loader';
import HomeCarousel from './homeCarousel';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import { Carousel, Row, Col, Modal } from 'antd';
import CustomFooter from '../components/Footer';

function Home() {
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertReducer);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <>
      {loading === true && <Loader />}

      <HomeCarousel />

      <div style={{ padding: '10px', margin: '10px auto' }}>
       <style>
          {`
            @media (min-width: 992px) {
              .home-container {
                padding: 20px 60px 40px 60px;
              }
            }
          `}
        </style>
        <div className="home-container">
          <Row gutter={[16]}>
            {cars.map((car, index) => (
              <Col key={index} lg={8} md={12} xs={24} className="" style={{ marginBottom: '40px' }}>
                <div className="card bs1 bg-transparent d-flex flex-column h-100">
                  <Carousel autoplay effect="fade">
                    {car.images.map((image, imgIndex) => (
                      <div key={imgIndex} onClick={() => handleImageClick(image.url)}>
                        <img src={image.url} className="card-img-top mt-3" alt={car.name} style={{ width: '100%', cursor: 'pointer' }} />
                      </div>
                    ))}
                  </Carousel>
                  <div className="card-content">
                    <div className="card-body text-left">
                      <div className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                        <h5 className="card-title"> <i className="ri-car-line"></i><strong> {car.name}</strong></h5>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div>
                            <p><i className="ri-car-fill"></i> Model: {car.type}</p>
                          </div>
                          <div>
                            <p className="card-text"><i className="ri-wallet-3-line"></i> Starting Price: <strong>₵{numeral(car.startingPrice).format('0,0.00')}</strong></p>
                          </div>
                          <div>
                            <p className="card-text"><i className="ri-calendar-event-line"></i> End Date: <strong>{car.endDate}</strong></p>
                          </div>
                        </div>
                        <div className="button">
                          <Link to={`/placebid/${car._id}`} className='btn1' title='Place your bid NOW'> Bid Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Modal open={visible} onCancel={handleModalClose} footer={null}>
        <img src={selectedImage} alt="Full Screen" style={{ width: '100%' }} />
      </Modal>
      <div>
        <CustomFooter />
      </div>
    </>
  );
}

export default Home;