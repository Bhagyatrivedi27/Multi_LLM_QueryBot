import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Container, Box, Typography, Button, Paper, Avatar, CssBaseline, Divider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import companyLogo from '../assets/signify.png';

const theme = createTheme();

const LoginPage = ({ onLoginSuccess, onLoginError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/chat');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
            <img src={companyLogo} alt="Company Logo" style={{ height: '80px', marginBottom: '20px' }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
              Welcome to{' '}
              <Typography component="span" variant="h4" sx={{ color: 'green', fontWeight: 'bold' }}>
                Signify AI
              </Typography>
            </Typography>
            <Divider variant="middle" sx={{ width: '100%', marginBottom: '20px' }} />
            <Paper
              elevation={9}
              sx={{
                padding: 3,
                borderRadius: 2,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                Sign in to{' '}
                <Typography component="span" variant="h5" sx={{ color: 'green', fontWeight: 'bold' }}>
                  Signify AI
                </Typography>
              </Typography>
              <Box mt={3} sx={{ width: '100%' }}>
                <GoogleLogin
                  onSuccess={onLoginSuccess}
                  onError={onLoginError}
                  render={(renderProps) => (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={renderProps.onClick}
                      sx={{ mt: 3, mb: 2, padding: 1.5, fontSize: 16 }}
                    >
                      Sign in with Google
                    </Button>
                  )}
                />
              </Box>
            </Paper>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LoginPage;
