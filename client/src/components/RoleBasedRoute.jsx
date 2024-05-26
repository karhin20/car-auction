// RoleBasedRoute.jsx
// RoleBasedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleBasedRoute = ({ role, element }) => {
    const { userInfo } = useSelector(state => state.auth);

    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    if (role === 'admin' && userInfo.role !== 'admin') {
        return <Navigate to="/unauthorized" replace />;
    }

   /* if (role === 'user' && userInfo.role !== 'user') {
        return <Navigate to="/unauthorized" replace />;
    }*/

    return element;
};

export default RoleBasedRoute;