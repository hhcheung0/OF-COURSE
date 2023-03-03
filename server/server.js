const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// Database connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

const port = 3000

db.once('open', () => {
    console.log('Database is open...')
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  

