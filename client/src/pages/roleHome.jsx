import React from 'react';
import { useSelector } from 'react-redux';
import AdminDefaultLayout from '../components/AdminDefaultLayout';
import DefaultLayout from '../components/DefaultLayout';
import Home from './home'


const RoleHome = () => {
  const { userInfo } = useSelector(state => state.auth);

  return (
    <>
      {userInfo ? (
        userInfo.role === 'admin' ? (
          <AdminDefaultLayout>
            <Home />
          </AdminDefaultLayout>
        ) : (
          <DefaultLayout>
           <Home />
          </DefaultLayout>

        )
      ) : (
        <DefaultLayout>
          <Home />

        </DefaultLayout>

      )}
    </>
  );
};

export default RoleHome;