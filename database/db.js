const mongoose = require('mongoose');
const key = require('./key')

const db = async() =>{
    await mongoose.connect(key.mongodb.url)
    console.log('databse connected');
}

module.exports = db;