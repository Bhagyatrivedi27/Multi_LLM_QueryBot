const { callGPT3, callGPT4 } = require('../services/llmService.js');
const Conversation = require('../models/Conversation');

exports.createConversation = async (req, res) => {
    const { userId, title, question } = req.body;

    if (!userId || !title || !question) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newConversation = new Conversation({
            userId,
            title,
            messages: [{ question, answer: "Initial response from GPT" }],
        });

        await newConversation.save();
        res.status(201).json(newConversation);
    } catch (error) {
        console.error('Error saving new conversation:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.addMessageToConversation = async (req, res) => {
    const { id } = req.params;
    const { question, model } = req.body;

    try {
        const conversation = await Conversation.findById(id);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        let answer;
        if (model === 'gpt-3') {
            answer = await callGPT3(question);
        } else if (model === 'gpt-4') {
            answer = await callGPT4(question);
        } else {
            return res.status(400).json({ error: 'Invalid model selected' });
        }

        conversation.messages.push({ question, answer });
        await conversation.save();

        res.json({ answer });
    } catch (error) {
        console.error('Error adding message to conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getConversations = async (req, res) => {
    const { userId } = req.params;
    try {
        console.log("fetching conversations for user ID", userId);
        const conversations = await Conversation.find({ userId }).select('title messages');
        console.log(conversations)
        res.json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getConversationById = async (req, res) => {
    const { id } = req.params;
    try {
        const conversation = await Conversation.findById(id);
        res.json(conversation);
    } catch (error) {
        console.error('Error fetching conversation by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
