const express = require('express');
const app = express();
const db = require('./database/db');
const urlRoute = require('./routes/router');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const {checkAuth } = require('./middlewares/auth');
const cors = require('cors');

// Database connection
db();

// Set template engine for server-side rendering
app.set('view engine', 'ejs');

// Parse incoming request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Parse cookies
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Routing
app.use('/url', urlRoute); // Apply restrictUser middleware to URL routes
app.use('/', checkAuth, staticRoute); // Apply checkAuth middleware to static routes
app.use('/user', userRoute);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
});
