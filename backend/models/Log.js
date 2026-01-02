const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    userId: {
        type: String, // Storing as string to be flexible with MySQL ID
        required: true
    },
    action: {
        type: String,
        required: true
    },
    ip: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Log', LogSchema);
