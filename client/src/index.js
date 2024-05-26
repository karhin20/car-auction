import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import "remixicon/fonts/remixicon.css";
import reportWebVitals from './reportWebVitals';
import  InitializeApp  from './components/initializeApp';

import './index.css';
import App from './App';
import RoleHome from './pages/roleHome';
import Login from './pages/login';
import Register from './pages/register';
import PlaceBid from './pages/carBidding';
import UserBids from './pages/userBidding';

import BidDetails from './pages/admin/bidDetails'
import AdminRegister from './pages/admin/Adminregister'
import ReceivedBids from './pages/admin/AllBids'
import AddCars from './pages/admin/newcar';
import AdminHome from './pages/admin/AdminHome';
import EditCar from './pages/admin/EditCar';
import UnauthorizedPage from './pages/admin/UnauthorizedPage'
import RoleBasedRoute from './components/RoleBasedRoute';

InitializeApp();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<RoleHome />} />
          <Route path="admin-register" element={<AdminRegister />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<UnauthorizedPage />} />
          <Route path="register" element={<Register />} />
          {/* User Role-Based Routes */}
          <Route element={<RoleBasedRoute role="user" element={<Outlet />} />}>
            <Route path="placebid/:carid" element={<PlaceBid />} />
            <Route path="userbids/:userid" element={<UserBids />} />
          </Route>

          {/* Admin Role-Based Routes */}
          <Route element={<RoleBasedRoute role="admin" element={<Outlet />} />}>
            <Route path="admin/home" element={<AdminHome />} />
            <Route path="admin/addcar" element={<AddCars />} />
            <Route path="admin/editcar/:carid" element={<EditCar />} />
            <Route path="admin/all-bids" element={<ReceivedBids />} />
            <Route path="admin/bid-details/:carid" element={<BidDetails />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </Provider>
);

reportWebVitals();