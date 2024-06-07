const jwt = require('jsonwebtoken');
const secret = "tushil@123"; //change as per your need

const setUser = (user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret);
};

const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null; // Handle invalid tokens gracefully
    }
};

module.exports = {
    setUser,
    getUser
};
