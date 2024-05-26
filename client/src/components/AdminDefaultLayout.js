import React, { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';


function AdminDefaultLayout(props) {
  const userData = JSON.parse(localStorage.getItem('user'));

  const user = userData ? userData.user : null;
  const username = user ? user.username : null;

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const additionalItems = [
    {
      key: '6',
      label: (
        <Link to='/admin/home'>
          Admin Home
        </Link>
      ),
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <div>
      <div className='bs1 header'>
        <div className='d-flex justify-content-between'>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <h5><i className="ri-shake-hands-line"></i>Quick Auctions</h5>
          </Link>
          <div className='mobile-menu-toggle' onClick={toggleMobileMenu}>
          </div>
          {user ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <Link to='/'>
                        Home
                      </Link>
                    ),
                  },
                  ...additionalItems,
                  {
                    key: '2',
                    label: (
                      <Link to='/admin/all-bids'>
                       Received Bids
                      </Link>
                    ),
                  },
                  {
                    key: '3',
                    label: (
                      <Link to='/admin/addcar'>
                        Add Car
                      </Link>
                    ),
                  },
                  {
                    key: '4',
                    label: <li onClick={handleLogout}>Logout</li>,
                  },
                ],
              }}
              placement='bottom'
            >
              <Button>{user.username}</Button>
            </Dropdown>
          ) : (
            <div>
              <Button onClick={() => (window.location.href = '/login')} style={{ marginRight: '10px' }}>Login</Button>
              <Button onClick={() => (window.location.href = '/register')}>Register</Button>
            </div>
          )}
        </div>
      </div>
      <div className='additional-menu'>
        <Menu mode="horizontal">
          <Menu.Item key="addCar">
            <Link to='/admin/addcar'><Button className='bs2'>Add Car</Button></Link>
          </Menu.Item>
          <Menu.Item key="editDeleteCar">
          <Link to='/admin/home'><Button className='bs2'>Admin Home</Button></Link>
          </Menu.Item>
          <Menu.Item key="bidsOverview">
            <Link to='/admin/all-bids'><Button className='bs2'>All Bids</Button></Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className='content'>{props.children}</div>
    </div>
  );
}

export default AdminDefaultLayout;