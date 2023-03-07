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


// Database connection
mongoose.connect(process.env.MONGODB_URI)
// mongoose.connect('mongodb+srv://admin:admin@cluster0.brap3r8.mongodb.net/test')
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database is open...')

    // use routers
    app.use(authRoutes)
})

var port = 3001
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
