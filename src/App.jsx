import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { setToken, setUser } from './store/slices/authSlice';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      dispatch(setToken(savedToken));
      const decodedToken = jwtDecode(savedToken);
      dispatch(setUser(decodedToken));
    }
  }, [dispatch]);

  const handleLoginSuccess = (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    sendTokenToServer(googleToken);
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  const sendTokenToServer = async (googleToken) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/google', { token: googleToken });
      const serverToken = response.data.token;
      localStorage.setItem('token', serverToken);
      dispatch(setToken(serverToken));

      const decodedToken = jwtDecode(serverToken);
      dispatch(setUser(decodedToken));
      
      navigate('/chat');
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} onLoginError={handleLoginError} />} />
      <Route path="/chat" element={token ? <ChatPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={token ? "/chat" : "/login"} />} />
    </Routes>
  );
};

export default App;
