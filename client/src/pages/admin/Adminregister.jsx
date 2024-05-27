import React, { useState } from 'react';
import { Row, Col, Form, Input, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { Link } from "react-router-dom";
import Loader from '../../components/Loader';
import { adminRegister } from '../../redux/actions/userInfoActions';

function AdminRegister() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertReducer);
  const [phoneExists, setPhoneExists] = useState(false);
  const [phone, setPhone] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    const { username, lastname, password, phone, adminCode } = values;
    const role = 'admin';
    setPhone(phone);
    setUserDetails({ username, lastname, password, phone, role, adminCode }); 

    try {
      const response = await axios.get(`https://car-auction-dusky.vercel.app/api/users/checkPhone/${phone}`, { headers: { 'Content-Type': 'application/json' } });

      if (response.data.exists) {
        setPhoneExists(true);
        message.error('Phone number already exists. Please use a different phone number.');
      } else {
        dispatch(adminRegister(userDetails));
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  
  return (
    <div>
      {loading && <Loader />}
      <Row gutter={5} className="d-flex align-items-center justify-content-center">
        <Col xs={24} lg={10} className='login-img' style={{ textAlign: 'center' }}>
          <img
            data-aos='slide-left'
            src="https://pngimg.com/uploads/bmw/bmw_PNG99532.png"
            alt='BMW for auction Ghana'
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-3' onFinish={handleSubmit}>
            <h1>Admin Sign Up</h1>
            <hr />
            <div className="d-flex justify-content-around">
              <Form.Item name='username' label='First Name' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item style={{ padding: '0 0px 0 10px' }} name='lastname' label='Last Name' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              name="phone"
              label='Phone Number'
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/, message: 'Please enter a valid phone number' }
              ]}
            >
              <Input placeholder="example 0550005555" />
              </Form.Item>
            <Form.Item
              name='adminCode'
              label='Admin Code'
              rules={[{ required: true, message: 'Please enter the Admin Code' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item 
              name='confirmPassword' 
              label='Confirm Password' 
              dependencies={['password']}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <button className='btn1' type="submit">Sign Up</button>
            </Form.Item>
            <hr />
            <div className='d-flex'>
              <p>Already Registered? </p>
              <Link to='/login'> Login here </Link>
            </div>
          </Form>
        </Col>
      </Row>
    )
    </div>
  );
}

export default AdminRegister;