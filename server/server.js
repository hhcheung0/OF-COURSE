const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require modules
const authRoutes = require('./Routes/authRoutes')
const courseRoutes = require('./Routes/courseRoutes')

// Database connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connection is open...')

    // use routers
    app.use(authRoutes)
    app.use(courseRoutes)
})

var port = 3001
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
