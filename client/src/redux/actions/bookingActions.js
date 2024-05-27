import axios from 'axios';
import { message } from 'antd';

export const bookcar = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await axios.post('https://car-auction-dusky.vercel.app/api/bookings/bookcar', reqObj); 
    dispatch({ type: 'LOADING', payload: false });
    message.success('Your bid was placed successfully');
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
    message.error('Something went wrong. Please try again later');
  }
};



export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get('https://car-auction-dusky.vercel.app/api/bookings/getAllBookings'); 
    dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data }); 
    dispatch({ type: 'LOADING', payload: false });
    message.success('Bids retrieved successfully');
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
    message.error('Failed to retrieve bids. Please try again later');
  }
};