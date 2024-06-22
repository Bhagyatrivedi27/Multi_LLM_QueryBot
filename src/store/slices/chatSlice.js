import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [],
    selectedConversation: null,
    selectedModel: 'gpt-3',
  },
  reducers: {
    addMessage: (state, action) => {
      const { conversationId, sender, text } = action.payload;
      const conversation = state.conversations.find(c => c._id === conversationId);
      if (conversation) {
        conversation.messages.push({ sender, text });
      } else {
        
        state.conversations.push({
          _id: conversationId,
          messages: [{ sender, text }],
        });
      }
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setSelectedModel: (state, action) => {
      state.selectedModel = action.payload;
    },
    updateConversation: (state, action) => {
      const updatedConversation = action.payload;
      const index = state.conversations.findIndex(c => c._id === updatedConversation._id);
      if (index !== -1) {
        state.conversations[index] = updatedConversation;
      }
    }
  },
});

export const { addMessage, setConversations, setSelectedConversation, setSelectedModel, updateConversation } = chatSlice.actions;
export default chatSlice.reducer;
