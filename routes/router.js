const express = require('express');
const router = express.Router();
const {handleShortURL,handleEntry,handleAnalytic} = require('../controllers/url.js')
const {restrictUser,checkAuth} = require('../middlewares/auth.js')

router.post('/',restrictUser, handleShortURL)
        .get('/:shortId',handleEntry)
        .get('/analytic/:shortId',handleAnalytic);

module.exports = router;  