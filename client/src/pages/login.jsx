import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/userInfoActions';
import Loader from '../components/Loader';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1000
});

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertReducer);

  const handleSubmit = (values) => {
    dispatch(userLogin(values));
  };

  return (
    <div>
      {loading && <Loader />}
      <Row justify="center" align="middle">
        <Col xs={24} lg={10} className='login-img' style={{ textAlign: 'center' }}>
          <img
            data-aos='slide-right'
            src="https://www.freepnglogos.com/uploads/bmw-png/gray-bmw-gts-car-png-image-0.png"
            alt='BMW for auction Ghana'
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>
        <Col xs={24} lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={handleSubmit}>
            <h1>Login</h1>
            <hr />
            <Form.Item name='phone' label='Phone Number' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <button className='btn1' type="submit">Login</button>
            </Form.Item>
            <hr />
            <p>Not Registered? <Link to='/register'>Register here</Link></p>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;