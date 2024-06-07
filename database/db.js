const mongoose = require('mongoose');
const key = require('./key');

const db = async () => {
    try {
        await mongoose.connect(key.mongodb.url);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = db;
