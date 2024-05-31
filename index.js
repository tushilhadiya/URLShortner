const express = require('express');
const app = express();
const db = require('./database/db')
const urlRoute = require('./routes/router');
const staticRoute = require('./routes/staticRoute')

//database connection
db();

//template engine for server side rendering
app.set('view engine','ejs') 

//accept json request data
app.use(express.json())
app.use(express.urlencoded({extended:false}));

//routing
app.use('/url',urlRoute)
app.use('/',staticRoute)

//port for server
app.listen(8080,()=>{
    console.log('server started at 8080');
}) 