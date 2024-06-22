import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, updateConversation } from '../store/slices/chatSlice';
import Message from './Message';
import axios from 'axios';


const ChatBox = () => {
    const dispatch = useDispatch();
    const selectedConversationIndex = useSelector((state) => state.chat.selectedConversation);
    const conversations = useSelector((state) => state.chat.conversations);
    const selectedModel = useSelector((state) => state.chat.selectedModel);
    const user = useSelector((state) => state.auth.user);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const selectedConversation = selectedConversationIndex !== null && selectedConversationIndex !== undefined 
        ? conversations[selectedConversationIndex] 
        : null;

    console.log("Selected conversation in ChatBox:", selectedConversation);

    useEffect(() => {
        if (selectedConversation) {
            const formattedMessages = selectedConversation.messages.flatMap(msg => [
                { sender: 'user', text: msg.question },
                { sender: 'bot', text: msg.answer }
            ]);
            setMessages(formattedMessages);
        }
    }, [selectedConversation]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const conversationId = selectedConversation && selectedConversation._id ? selectedConversation._id : 'new';
        const userMessage = { conversationId, sender: 'user', text: input };
        dispatch(addMessage(userMessage));

        const updatedMessages = [...messages, { sender: 'user', text: input }];
        setMessages(updatedMessages);

        try {
            const backendUrl = 'http://localhost:3000';
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found');
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const payload = {
                question: input,
                model: selectedModel,
                userId: user.userId,
                title: input,
            };

            console.log("Sending payload:", payload);

            let endpoint = `${backendUrl}/api/chat/${conversationId === 'new' ? 'new' : `conversation/${conversationId}`}`;
            const response = await axios.post(endpoint, payload, { headers });

            const botMessage = { conversationId: response.data._id || conversationId, sender: 'bot', text: response.data.answer };
            dispatch(addMessage(botMessage));

            const updatedMessagesWithBotResponse = [...updatedMessages, { sender: 'bot', text: response.data.answer }];
            setMessages(updatedMessagesWithBotResponse);

            if (conversationId === 'new') {
                dispatch(updateConversation(response.data));
                dispatch(setSelectedConversation(conversations.length));
            } else {
                const updatedConversation = { ...selectedConversation, messages: [...selectedConversation.messages, { question: input, answer: response.data.answer }] };
                dispatch(updateConversation(updatedConversation));
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    return (
        <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2, bgcolor: '#363533', borderRadius: 1, margin: 1 }}>
                {messages.map((message, index) => (
                    <React.Fragment key={index}>
                        <Message sender={message.sender} text={message.text} />
                    </React.Fragment>
                ))}
            </Box>
            <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Type your prompt to Signify AI..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }}
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                />
                <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 2 }}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatBox;
