const express = require('express');
const {
    createConversation, 
    getConversations,
    getConversationById,
    addMessageToConversation,
} = require('../controllers/chatController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/new', authMiddleware, createConversation);
router.get('/:userId', authMiddleware, getConversations);
router.get('/conversation/:id', authMiddleware, getConversationById);
router.post('/conversation/:id', authMiddleware, addMessageToConversation);

module.exports = router;