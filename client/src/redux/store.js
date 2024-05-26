import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { carsReducer } from './reducers/carsreducer';
import { alertReducer } from './reducers/alertsReducer';
import {biddingReducer} from './reducers/biddingreducer';
import { authReducer } from "./reducers/authReducer"
import { usersReducer } from './reducers/usersreducer';

const rootReducer = combineReducers({
  carsReducer,
  alertReducer,
  biddingReducer,
  usersReducer,
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;