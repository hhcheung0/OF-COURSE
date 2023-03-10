const {Router} = require('express')
const bcrypt = require('bcrypt')

// require Models
const User = require('../Models/UserModel')

const router = Router()

// LOGIN
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
    .then(user => {
        if(!user){
            return res.status(400).send({ message: 'User does not exist!' })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) res.send(err);
            else {
                if (result) {
                    // return res.redirect('/') }
                    return res.status(200).send({ message: 'Login is successful '}) }
                else {
                    return res.status(401).send({ message: "Login is not successful"}) } // res.status(401)? res.status(400)?
            }
        })
    })
    .catch(error => {
        console.error(error);
        // if (error.code === 11000) {
        //     res.status(400).send({ message: 'Username already exists' });
        // }else{
        //     res.status(500).send({ message: 'Error creating user' });
        // }
        res.send({ message: 'Error login' });
    })
});

// SIGNUP
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
            return User.countDocuments()
            .then(count => {
                return User.create({
                    userID: count + 1, //existUser.userID + 1
                    username: username,
                    password: hashedPassword,
                    accessRight: true,
                    maxCredit: 18,
                    enrolledCourseID: [],
                    passedCourseID: [],
                    shoppingCartCourseID: []
                })
            }) 
        })
        .then(() => {
            res.send({ message: 'Signup successfully'});
        })
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