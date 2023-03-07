

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

// Database connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database is open...')

    const UserSchema = Schema({
        name: { type: String, required: true, unique: true },
        userid: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        accessright: { type: Boolean, required: true },
        enrolledcourseid: { type: Array },
        maxCredit: { type: Number },
        passedcourseid: { type: Array },
        shoppingcartcourseid: { type: Array }
      });
    const User = mongoose.model('User', UserSchema);

  
    app.post('/login', (req, res) => {
        const { name, password } = req.body;

        User.findOne({ name: name }, (err, user) => {
            if (err) { return res.status(500).send(err); }
            if (!user) { return res.status(401).send('Incorrect username or password'); }
            
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) { return res.status(500).send(err); }
                if (isMatch) {
                    res.status(200).send('Login successful');
                } else {
                    return res.status(401).send('Incorrect username or password');
                }
            });
        });
    });  

})

var port = 3001
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
