const {Router} = require('express')
const bcrypt = require('bcrypt')

// require Models
const User = require('../Models/UserModel')

const router = Router()

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = User.findOne({username})
    res.send(user)
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // if (Password !== Confirmpassword) {
    //     return res.status(400).send('Passwords do not match');
    // }
    User.create({
        userID: 0000, // userID: current userID + 1?
        username: username,
        password: password,
        accessRight: true,
        maxCredit: 18,
        enrolledCourseID: [],
        passedCourseID: [],
        shoppingCartCourseID: []
    })
    res.send({status: 'ok'})
});

module.exports = router