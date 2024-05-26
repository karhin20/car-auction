import axios from 'axios';
import { message } from 'antd'

export const getAllCars=()=>async dispatch=>{
    dispatch({type : 'LOADING', payload: true})

    try {
        const response = await axios.get('/api/cars/getAllCars')
        dispatch({type: 'GET_ALL_CARS', payload:response.data})
        dispatch({type : 'LOADING', payload: false})
    } catch (error) {
        dispatch({type : 'LOADING', payload: false})
        console.log(error)
        dispatch({type : 'LOADING', payload: false})
    }
}

export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
 

  try {
    await axios.post('/api/cars/addcar', reqObj);
    dispatch({ type: 'LOADING', payload: false });
    message.success('New Car Added Successfully');
    
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};



export const editCar = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axios.post('/api/cars/editcar', reqObj);
        dispatch({ type: 'LOADING', payload: false });
        message.success('Car Details Updated Successfully');

        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false });
        message.error('Failed to update car details. Please try again.');
    }
}



export const deleteCar = (carId) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.delete(`/api/cars/deletecar/${carId}`);
    dispatch({ type: 'LOADING', payload: false });
    message.success('Car and related bids deleted successfully');
    return Promise.resolve();  // Resolve the promise on success
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
    message.error('Failed to delete car and related bids');
    return Promise.reject(error);  // Reject the promise on error
  }
};