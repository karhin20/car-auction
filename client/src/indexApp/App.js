import { Route, Routes, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import PlaceBid from '../pages/carBidding';
import UserBids from '../pages/userBidding';
import AddCar from '../pages/addCar';
import AdminHome from '../pages/AdminHome';
import EditCar from '../pages/EditCar';

function App() {
  const isAdmin = true; 
  const isLoggedIn = localStorage.getItem('user') ? true : false; 
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Private isAdmin={isAdmin} isLoggedIn={isLoggedIn} />}>
          <Route path="/placebid/:carid" element={<PlaceBid />} />
          <Route path="/userbids/:userid" element={<UserBids />} />
          {isLoggedIn && <Route path="/addcar" element={<AddCar />} />}
          {isLoggedIn && <Route path="/admin" element={<AdminHome />} />}
          {isLoggedIn && <Route path="/editcar/:carid" element={<EditCar />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Private({ isAdmin, isLoggedIn }) {
  let storedUser = localStorage.getItem('user');
  let auth = { user: storedUser ? JSON.parse(storedUser) : null };
  
  return auth.user ? (isAdmin ? <Outlet /> : <Navigate to="/" />) : <Navigate to="/login" />;
}

export default App;