const {Router} = require('express')
const bcrypt = require('bcrypt')

// require Models
const User = require('../Models/UserModel')

const router = Router()

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
    .then(user => {
        if(!user){
            return res.status(400).send({ message: 'User does not exist!' })
        }
    
        return{
            username: username,
            password: password
        }
    })
    .then(() => {
        res.send({ message: 'Login is successful '})
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
                    userID: 3, //existUser.userID + 1
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