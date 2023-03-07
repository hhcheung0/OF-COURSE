const {Router} = require('express')
const bcrypt = require('bcrypt')

// require Models
const User = require('../Models/UserModel')

const router = Router()

router.post('/login', (req, res) => {
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

router.post('/signup', (req, res) => {
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

module.exports = router