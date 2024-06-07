const User = require('../models/user');
const { setUser } = require('../service/auth');
const bcrypt = require('bcryptjs');

const handleUserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            name,
            email,
            password: hashedPassword
        });

        console.log("User created", result);
        return res.status(201).json({ data: "User created" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: 'User Not Found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = setUser(user);

        res.cookie('uid', token);
        return res.json({ uid: token, name: user.name });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { handleUserSignup, handleUserLogin };
