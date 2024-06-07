const express = require('express');
const router = express.Router();
const URL = require('../models/url');

router.post('/', async (req, res) => {
    try {
        if (!req.body.uid) {
            return res.status(401).json({ error: "User not found" });
        }

        const data = await URL.find({ createdBy: req.user._id });

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "No URLs found for the user" });
        }

        res.status(200).json({ data : data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
