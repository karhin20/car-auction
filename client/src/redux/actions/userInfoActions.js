import axios from "axios";
import { message } from 'antd';

export const userLogin = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const response = await axios.post('https://car-auction-dusky.vercel.app/api/users/login', reqObj);
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data }); 
        message.success('Login successful');
       
        dispatch({
            type: 'SET_USER_INFO',
            payload: response.data
        });
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    } catch (error) {
        console.log(error);
        message.error('Something went wrong. Login failed');
        dispatch({ type: 'LOGIN_FAIL', payload: error.response ? error.response.data : error.message });
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const userRegister = (reqObj) => async dispatch => {
    console.log(reqObj);
    dispatch({ type: 'LOADING', payload: true });

    try {
        const response = await axios.post('https://car-auction-dusky.vercel.app/api/users/register', reqObj);
        message.success('Registration successful');
        setTimeout(() => {
            window.location.href = '/login';
        }, 500);
    } catch (error) {
        console.log(error);
        message.error("Something went wrong. Retry again");
        dispatch({ type: 'REGISTER_FAIL', payload: error.response ? error.response.data : error.message });
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};


export const adminRegister = (reqObj) => async dispatch => {
    console.log(reqObj);
    dispatch({ type: 'LOADING', payload: true });

    try {
        const response = await axios.post('https://car-auction-dusky.vercel.app/api/admin/register', reqObj);
        message.success('Registration successful');
        setTimeout(() => {
            window.location.href = '/login';
        }, 500);
    } catch (error) {
        console.log(error);
        message.error("Something went wrong. Retry again");
        dispatch({ type: 'REGISTER_FAIL', payload: error.response ? error.response.data : error.message });
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};



import axios from "axios";
import { message } from 'antd';

export const getAllUsers = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const token = localStorage.getItem('token'); // Retrieve the authentication token from localStorage
        const response = await axios.get('https://car-auction-dusky.vercel.app/api/users/getAllUsers', {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }
        });
        dispatch({ type: 'GET_ALL_USERS', payload: response.data });
    } catch (error) {
        console.log(error);
        message.error('Failed to fetch users. Please try again.');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};