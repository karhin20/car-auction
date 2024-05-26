import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';

function DefaultLayout(props) {
  const userData = JSON.parse(localStorage.getItem('user'));


  const user = userData ? userData.user : null;
  const username = user ? user.username : null;
  const userId = user ? user.id : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const additionalItems = [
    {
      key: '3',
      label: (
        <Link to={`/userbids/${userId}`}>
          My Bids
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className='bs1 header'>
        <div className='d-flex justify-content-between'>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <h5><i className="ri-shake-hands-line"></i> Quick Auctions</h5>
          </Link>
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
                    key: '4',
                    label: <li onClick={handleLogout}>Logout</li>,
                  },
                ],
              }}
              placement='bottom'
            >
              <Button>{username}</Button>
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
          <Menu.Item key="home">
            <Link to='/'><Button className='bs2'>Home</Button></Link>
          </Menu.Item>
          <Menu.Item key="mybids">
          <Link to={`/userbids/${userId}`}><Button className='bs2'>My Bids</Button></Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className='content'>{props.children}</div>
    </div>
  );
}

export default DefaultLayout;