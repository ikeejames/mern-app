require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CONNECTION
const host = process.env.MONGO_URI;
// const db = 'myData';
mongoose.connect(host);

// MIDLEWARES
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
const friendsRoutes = require('./router/Friends');
app.use('/friends', friendsRoutes);


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});