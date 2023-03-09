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

    //check whether the username exist or not
    User.findOne({ username })
    .then (existUser => {
        if(existUser){
            return res.status(400).send({ message: 'User already exists!' })
        }
        // hashing password
        return bcrypt.hash(password, 10)
            .then(hashedPassword => {
                return User.create({
                    userID: 0002, //existUser.userID + 1, // userID: current userID + 1?
                    username: username,
                    password: hashedPassword,
                    accessRight: true,
                    maxCredit: 18,
                    enrolledCourseID: [],
                    passedCourseID: [],
                    shoppingCartCourseID: []
                })
            });
    })
    .then(() => {
        res.send({ message: 'Signup successfully'});
    })
    .catch(error => {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).send({ message: 'Username already exists' });
        }else{
            res.status(500).send({ message: 'Error creating user' });
        }
        
    })

});

module.exports = router