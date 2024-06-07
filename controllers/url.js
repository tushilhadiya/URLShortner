const babyid = require('babyid')
const URL = require('../models/url')

const handleShortURL = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }

        const existingURL = await URL.findOne({ redirectURL: url });

        if (existingURL) {
            return res.status(200).json({ message: "URL already exists" });
        }

        const shortID = babyid.generate(8);

        await URL.create({
            shortId: shortID,
            redirectURL: url,
            visitedHistory: [],
            createdBy: req.user._id
        });

        return res.status(200).json({ data: { id: shortID } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const handleEntry = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        console.log(shortId);

        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        console.log(entry);
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const handleAnalytic = async (req, res) => {
    try {
        const shortId = req.params.shortId;

        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        return res.json({ url: result.visitHistory });
        console.log(result.visitHistory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

 
module.exports = { handleShortURL, handleEntry, handleAnalytic };