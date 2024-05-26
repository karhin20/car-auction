import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  height: '160px',
  color: 'black',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'white',
  margin: '10px',
 
};
const HomeCarousel= () => (
  <Carousel autoplay>
    <div>
      <h6 style={contentStyle}>Welcome to the best Car Auctions Platform</h6>
    </div>
    <div>
      <h6 style={contentStyle}>Register an account and start bidding</h6>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>

  </Carousel>
);
export default HomeCarousel;