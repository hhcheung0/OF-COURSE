const {Router} = require('express')
const bcrypt = require('bcrypt')

// require Models
const User = require('../Models/UserModel')

const router = Router()

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({username: 'Hinson'})
    .then(result => res.send(result))
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // if (Password !== Confirmpassword) {
    //     return res.status(400).send('Passwords do not match');
    // }

    // hashing password
    User.create({
        userID: 0001, // userID: current userID + 1?
        username: username,
        password: password,
        accessRight: true,
        maxCredit: 18,
        enrolledCourseID: [],
        passedCourseID: [],
        shoppingCartCourseID: []
    })
    .then(result => console.err(result))
    res.send({status: 'ok'})
});

module.exports = router