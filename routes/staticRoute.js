const express = require('express');
const router = express.Router();
const URL = require('../models/url')

router.get('/homepage', async (req, res)=>{
    const data = await URL.find({});

    return res.render('home',{
        url:data
    })
})
module.exports = router; 