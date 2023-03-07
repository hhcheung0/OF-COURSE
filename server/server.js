

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
// mongoose.connect('mongodb+srv://admin:admin@cluster0.brap3r8.mongodb.net/test')
const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database is open...')

    const UserSchema = Schema({
        Username: { type: String, required: true, unique: true },
        UserID: { type: Number, required: true, unique: true },
        Password: { type: String, required: true },
        Accessright: { type: Boolean, required: true },
        EnrolledcourseID: { type: Array },
        MaxCredit: { type: Number },
        Passedcourseid: { type: Array },
        Shoppingcartcourseid: { type: Array }
      });
    const User = mongoose.model('User', UserSchema);

    app.post('/signup', (req, res) => {
        const { Username, Password, Confirmpassword } = req.body;

        if (Password !== Confirmpassword) {
            return res.status(400).send('Passwords do not match');
        }

        User.find()
        .sort('-userid')
        .limit(1)
        .exec((err, user) => {

            if (err) {
                console.error(err);
                return res.status(500).send('Internal server error');
            }

            bcrypt.hash(Password, 10, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal server error');
                }

                const newuserid = user.length > 0 ? user[0].userid + 1 : 1;

                const newUser = new User({
                    Username: Username,
                    Password: hash,
                    Userid: newuserid,
                    Accessright: 0,
                    Enrolledcourseid: [],
                    MaxCredit: 18,
                    Passedcourseid: [],
                    Shoppingcartcourseid: []
                });

                newUser.save((err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Internal server error');
                    }else{
                        res.status(200).send('User created successfully');
                    }
                    
                });
            });
        });
    });

    app.post('/login', (req, res) => {
        const { Username, Password } = req.body;

        User.findOne({ Username: Username }, (err, user) => {
            if (err) { return res.status(500).send(err); }
            if (!user) { return res.status(401).send('Incorrect username or password'); }
            
            bcrypt.compare(Password, user.Password, (err, isMatch) => {
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

var port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
