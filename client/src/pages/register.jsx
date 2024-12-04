import React, { useState } from 'react';
import { Row, Col, Form, Input, message, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/actions/userInfoActions';
import axios from 'axios';
import { Link } from "react-router-dom";
import OTPInput from 'react-otp-input';  
import Loader from '../components/Loader';

function AlertPage({ phone, onVerificationSuccess }) {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyOTP = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://car-auction-dusky.vercel.app/api/verify-otp', { phone, otp }, { headers: { 'Content-Type': 'application/json' } });
      if (response.data.code === '1100') {
        onVerificationSuccess();
        message.success('OTP verified successfully!');
      } else {
        message.error('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      message.error('Failed to verify OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Row>
        <Col lg={8} className="d-flex align-items-center justify-content-center">
          <div>
            <h2>Enter OTP</h2>
            <h3>Use "123456" as OTP</h3>
            <Form>
              <Form.Item label="OTP">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: '40px',
                    height: '40px',
                    margin: '0 5px',
                    fontSize: '16px',
                    textAlign: 'center',
                    borderRadius: '4px',
                    border: '1px solid rgba(0,0,0,0.3)'
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleVerifyOTP} disabled={isSubmitting}>Verify OTP</Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

function Register() {
  const dispatch = useDispatch();
  const [phoneExists, setPhoneExists] = useState(false);
  const [otpResponse, setOtpResponse] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [phone, setPhone] = useState('');
  const [userDetails, setUserDetails] = useState({}); // State to store user details
  const [loading, setLoading] = useState(false); // State to control loader

  const handleSubmit = async (values) => {
    const { username, lastname, password, phone } = values;
    const role = 'user';
    setPhone(phone);
    setUserDetails({ username, lastname, password, phone, role }); // Store user details
    console.log(phone);

    setLoading(true); // Show loader

    try {
      const response = await axios.get(`https://car-auction-dusky.vercel.app/api/users/checkPhone/${phone}`, { headers: { 'Content-Type': 'application/json' } });
      if (response.data.exists) {
        setPhoneExists(true);
        message.error('Phone number already exists. Please use a different phone number.');
        setLoading(false); // Hide loader
      } else {
        const otpResponse = await axios.post('https://car-auction-dusky.vercel.app/api/generate-otp', { phone: phone }, { headers: { 'Content-Type': 'application/json' } });

        console.log(otpResponse.data); 

        if (otpResponse.data.code === '1000') {
          setOtpResponse(otpResponse.data);
          setShowAlert(true);
          message.success('OTP sent successfully. Please check your phone.');
        } else {
          message.error(otpResponse.data.message || 'Failed to generate OTP. Please try again.');
        }
        setLoading(false); // Hide loader
      }
    } catch (error) {
      console.error('Error during registration:', error);
      message.error('Registration failed. Please try again.');
      setLoading(false); // Hide loader
    }
  };

  const handleVerificationSuccess = () => {
    const { username, lastname, password, phone, role } = userDetails;

    dispatch(userRegister({ username, lastname, password, phone, role }));
    message.success('Registration successful!');
  };

  return (
    <div>
      {loading && <Loader />}
      {showAlert ? (
        <AlertPage phone={phone} otpCode={otpResponse.otpCode} onVerificationSuccess={handleVerificationSuccess} />
      ) : (
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
              <h1>Register</h1>
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
                <button className='btn1' type="submit">Register</button>
              </Form.Item>
              <hr />
              <div className='d-flex'>
                <p>Already Registered? </p>
                <Link to='/login'> Login here </Link>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Register;
