const { getUser } = require('../service/auth');

const restrictUser = (req, res, next) => {
    const token = req.body.uid;
    console.log("token:", token);
    
    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }
    
    const user = getUser(token);
    
    if (!user) {
        return res.status(401).json({ error: 'User not found or invalid token' });
    }
    
    req.user = user;
    console.log("user:", user);
    next();
};

const checkAuth = (req, res, next) => {
    const token = req.body.uid;

    if (token) {
        const user = getUser(token);
        req.user = user;
    }
    
    next();
};

module.exports = { restrictUser, checkAuth };
