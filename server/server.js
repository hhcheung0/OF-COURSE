const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));

// require modules
const authRoutes = require('./Routes/authRoutes')
const courseRoutes = require('./Routes/courseRoutes')
const userRoutes = require('./Routes/userRoutes')

// Database connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    // use routers
    app.use(authRoutes)
    app.use(courseRoutes)
    app.use(userRoutes)
})

var port = 3001
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
