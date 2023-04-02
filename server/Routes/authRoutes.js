const {Router} = require('express')
const bcrypt = require('bcrypt')

// require Models
const User = require('../Models/UserModel')

// require tools
const { createToken } = require('../Tools/authTools')

const router = Router()

// LOGIN
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
    .then(user => {
        if(!user){
            return res.status(400).send({success: false, error: 'User does not exist!' })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) res.send(err);
            else {
                if (result) {
                    res.cookie('jwt', createToken(username))
                    return res.status(200).send({success: true}) }
                else {
                    return res.status(401).send({success: false, error: "Login is not successful"}) } // res.status(401)? res.status(400)?
            }
        })
    })
    .catch(error => {
        console.error(error);
        res.send({success: false, error: 'Error login' });
    })
});

// SIGNUP
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    //check whether the username exist or not
    User.findOne({ username })
    .then (existUser => {
        if(existUser){
            return res.status(400).send({ success: false, error: 'User already exists!' })
        }
        // hashing password
        bcrypt.hash(password, 10)
        .then(hashedPassword => {
            User.countDocuments()
            .then(count => {
                User.create({
                    userID: count + 1, //existUser.userID + 1
                    username: username,
                    password: hashedPassword,
                    accessRight: true,
                    maxCredit: 18,
                    enrolledCourseID: [],
                    passedCourseID: [],
                    shoppingCartCourseID: []
                })
                .then(() => {
                    res.cookie('jwt', createToken(username))
                    res.send({success: true, error: 'Signup successfully'});
                })
            }) 
        })
    })
    .catch(error => {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).send({success: false, error: 'Username already exists' });
        }else{
            res.status(500).send({success: false, error: 'Error creating user' });
        }
        
    })

});

router.post('/logout', (req, res) => {
    res.clearCookie('jwt')
    res.json({success: true})
})

module.exports = router