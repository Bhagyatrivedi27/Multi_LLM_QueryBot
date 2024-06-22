import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import { setSelectedConversation } from '../store/slices/chatSlice';

const ConversationList = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const selectedConversationIndex = useSelector((state) => state.chat.selectedConversation);

  console.log("Conversations in ConversationList:", conversations);
  console.log("Selected conversation index in ConversationList:", selectedConversationIndex);

  if (!Array.isArray(conversations) || conversations.length === 0) {
    return (
      <Box
        sx={{
          padding: 2,
          textAlign: 'center',
          bgcolor: '#f0f0f0',
          borderRadius: 2,
          boxShadow: 2,
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="textSecondary">No conversations available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '70vh',
        overflowY: 'auto',
        bgcolor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 2,
        padding: 2,
      }}
    >
      <Typography variant="h6" color="textPrimary" gutterBottom>
        Conversations
      </Typography>
      <List sx={{ bgcolor: 'background.paper' }}>
        {conversations.map((conversation, index) => (
          <ListItem
            button
            key={index}
            selected={index === selectedConversationIndex}
            onClick={() => {
              console.log(`Selecting conversation at index ${index}`);
              dispatch(setSelectedConversation(index));
            }}
            sx={{
              marginBottom: 1,
              borderRadius: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
              },
              '&.Mui-selected:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <ListItemText primary={conversation.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConversationList;
