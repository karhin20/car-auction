import React from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <DefaultLayout>
      <div style={{ textAlign: 'center', paddingTop: "50px"}}>
        <h1>Unauthorized Access</h1>
        <p>You are not authorized to view this page.</p>
        <p>You need to log in first As Admin.</p>
        <div>
          <Link to="/login">Log in</Link> | <Link to="/admin-register">Sign up</Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UnauthorizedPage;