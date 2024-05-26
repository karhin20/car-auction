import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getAllCars, editCar } from '../../redux/actions/carsActions';
import AdminDefaultLayout from '../../components/AdminDefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import numeral from 'numeral';
import CustomFooter from '../../components/Footer';

function EditCar() {
  const { carid } = useParams();
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertReducer);
  const [car, setCar] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [startingPrice, setStartingPrice] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      const selectedCar = cars.find(car => car._id === carid);
      if (selectedCar) {
        setCar(selectedCar);
        setFileList(selectedCar.images.map((image, index) => ({
          uid: index,
          name: `image-${index}`,
          status: 'done',
          url: image.url,
        })));
        setStartingPrice(selectedCar.startingPrice);
      }
    }
  }, [cars, carid, dispatch]);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const onFinish = async (values) => {
    if (!fileList.length) {
      message.error("Please upload images.");
      return;
    }

    try {
      const imagesBase64 = await Promise.all(fileList.map(file => {
        if (file.originFileObj) {
          return getBase64(file.originFileObj);
        }
        return file.url; 
      }));
      const updatedValues = {
        ...values,
        images: imagesBase64,
        id: carid,
      };
      dispatch(editCar(updatedValues));
      message.success("Car details updating");
    } catch (error) {
      console.error('Error converting images:', error);
      message.error("Failed to convert images.");
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleStartingPriceChange = (e) => {
    const price = e.target.value;
    setStartingPrice(numeral(price).format('₵0,0.00'));
  };

  return (
    <AdminDefaultLayout>
      {loading && <Loader />}
      <Row justify='center' gutter={16} style={{ padding: "15px 0 15px 0" }}>
        <Col lg={12} sm={23} xs={23}>
          {car ? (
            <Form key={carid} initialValues={car} className='bs1 p-3' layout='vertical' onFinish={onFinish}>
              <h4 className='text-center'>Edit Car Details</h4>
              <hr />
              <Form.Item name='name' label="Car Brand" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name='type' label="Car Model" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name='adminPhone' label="Administrator's Phone Number" rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/, message: 'Please enter a valid phone number' }
              ]}>
                <Input placeholder="example 0550005555" />
              </Form.Item>
              <Form.Item name='location' label="Car Location" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <div>Entered Starting Price:<b> ₵{numeral(startingPrice).format('0,00.00')}</b></div>
              <Form.Item name='startingPrice' label="Starting Price (as a number without commas)" rules={[{ required: true }]}>
                <Input placeholder="example 500000" onChange={handleStartingPriceChange} />
              </Form.Item>
              <Form.Item
                name='images'
                label='Upload Images'
                valuePropName='fileList'
                getValueFromEvent={e => e && e.fileList}
                rules={[{ required: true, message: 'Please upload car images' }]}
              >
                <Upload
                  name='images'
                  listType='picture-card'
                  multiple
                  beforeUpload={() => false}
                  onChange={onChange}
                  onRemove={(file) => {
                    setFileList(fileList.filter(item => item.uid !== file.uid));
                  }}
                >
                  {fileList.length >= 8 ? null : <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>}
                </Upload>
              </Form.Item>
              <div style={{ textAlign: 'center' }}>
                <Button className="btn1" type="btn1" htmlType="submit">SAVE CHANGES</Button>
              </div>
            </Form>
          ) : (
            <div>Loading car details...</div>
          )}
        </Col>
      </Row>
      <div>
        <CustomFooter/>
      </div>
    </AdminDefaultLayout>
  )};
  

  export default EditCar
