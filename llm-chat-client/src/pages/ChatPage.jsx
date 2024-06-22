import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedModel, setSelectedConversation, setConversations } from '../store/slices/chatSlice';
import ChatBox from '../components/ChatBox';
import ConversationList from '../components/ConversationList';
import Navbar from '../components/Navbar';
import { Container, Box, Typography, MenuItem, Select, FormControl, InputLabel, Grid, Button } from '@mui/material';
import axios from 'axios';

const ChatPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const selectedModel = useSelector((state) => state.chat.selectedModel);

  const handleNewChat = () => {
    dispatch(setSelectedConversation(null));
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const backendUrl = 'http://localhost:3000';
        const token = localStorage.getItem('token');
        console.log("Fetched token in ChatPage:", token); 

        if (!token) {
          console.error('No token found');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        console.log("Fetching conversations with headers:", headers);
        console.log("User:", user);
        
        const response = await axios.get(`${backendUrl}/api/chat/${user.userId}`, { headers });
        console.log("Fetched conversations:", response.data);
        
        dispatch(setConversations(response.data));
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    if (user) {
      fetchConversations();
    }
  }, [dispatch, user]);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2} sx={{ marginTop: 8 }}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">Conversations</Typography>
              <Button variant="contained" color="primary" onClick={handleNewChat} sx={{ mt: 2, mb: 2 }}>
                New Chat
              </Button>
              <ConversationList />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h4" sx={{color: 'green', marginLeft: '250px'}}>Signify AI</Typography>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel id="model-select-label">Select Model</InputLabel>
                <Select
                  labelId="model-select-label"
                  value={selectedModel}
                  onChange={(e) => dispatch(setSelectedModel(e.target.value))}
                  label="Select Model"
                >
                  <MenuItem value="gpt-3">GPT-3</MenuItem>
                  <MenuItem value="gpt-4">GPT-4</MenuItem>
                </Select>
              </FormControl>
              <ChatBox />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ChatPage;
