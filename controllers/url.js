const babyid = require('babyid')
const URL = require('../models/url')

const handleShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    const existingURL = await URL.find({
        redirectURL : body.url
    })
    console.log(existingURL);
    if(body.url == existingURL.redirectURL){
        return res.json({id: existingURL.shortID})
    }else{
        const shortID = babyid.generate(8);
        await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: []
    })
    // return res.render('home',{
    //     id: shortID
    // })
    return res.json({ id: shortID })
    }    
}
const handleEntry = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );
    console.log(entry);
    res.redirect(entry.redirectURL) 
}

const handleAnalytic = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.render('home',{
        url : result.visitHistory
    })
}

module.exports = {handleShortURL,handleEntry,handleAnalytic};