import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import companyLogo from '../assets/signify.png';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  

  const [selectedLogo, setSelectedLogo] = useState(companyLogo);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedLogo(reader.result);

      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#363533' }}>
      <Toolbar sx={{ color: 'white' }}>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src={selectedLogo} alt="Company Logo" style={{ height: '40px' }} />
        </IconButton>
        <input type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} id="logoInput" />
        <label htmlFor="logoInput" style={{ marginLeft: '10px', cursor: 'pointer' }}>
          Logo
        </label>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { color: 'green' } }}>
          Home
        </Button>
        {token ? (
          <Button color="inherit" onClick={handleLogout} sx={{ '&:hover': { color: 'green' } }}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login" sx={{ '&:hover': { color: 'green' } }}>
            Login
          </Button>
        )}
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
