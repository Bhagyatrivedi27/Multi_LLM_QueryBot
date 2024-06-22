    const mongoose = require('mongoose');

    const ConversationSchema = new mongoose.Schema({
        userId: { type: String, required: true },
        title: { type: String, required: true },
        messages: [
            {
                question: { type: String, required: true },
                answer: { type: String, required: true },
            },
        ],
    }, { timestamps: true });

    module.exports = mongoose.model('Conversation', ConversationSchema);