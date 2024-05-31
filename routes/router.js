const express = require('express');
const router = express.Router();
const {handleShortURL,handleEntry,handleAnalytic} = require('../controllers/url.js')

router.post('/',handleShortURL)
        .get('/:shortId',handleEntry)
        .get('/analytic/:shortId',handleAnalytic);

module.exports = router;