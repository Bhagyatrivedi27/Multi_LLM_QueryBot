import React from 'react';
import { Box, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
const Message = ({ sender, text }) => {
  const isUser = sender === 'user';

  console.log("Rendering Message:", { sender, text });
  console.log(" is the text there? ", text)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: '60%',
          padding: 2,
          borderRadius: 1,
          bgcolor: isUser ? 'primary.main' : 'grey.300',
          color: isUser ? 'white' : 'black',
        }}
      > 
         <Avatar sx={{ mr: 1, bgcolor: isUser ? 'primary.dark' : 'grey.500' }}>
          {isUser ? <PersonIcon /> : <AddIcon />}
        </Avatar>
        <Typography variant="body1">{text || '...'}</Typography>
      </Box>
    </Box>
  );
};

export default Message;
