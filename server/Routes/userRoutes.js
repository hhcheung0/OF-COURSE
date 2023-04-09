const { Router } = require('express')
const router = Router()

// require models
const User = require('../Models/UserModel')

// require tools
const { verifyToken } = require('../Tools/authTools')

// get an array of all users
router.get('/data/user', (req, res) => {
    User.find().sort('userID')
    .then(userArray => {
        if (!userArray) return res.json({error: 'user array is empty'})
        return res.json(userArray)
    })
    .catch(error => res.json(error))
})

// get specific data of a user by jwt
router.get('/data/user/cookie', (req, res) => {
    const username = verifyToken(req.cookies.jwt)
    User.findOne({username})
    .then(result => {
        // filter 
        const {password, _id, __v, ...user} = result._doc
        res.json({user})
    })
    .catch(error => res.json({error}))
})

// get a specific user
router.get('/data/user/:userID', (req, res) => {
    User.findOne(req.params)
    .then(user => {
        if (!user) return res.json({error: 'user is not found'})
        return res.json(user)
    })
    .catch(error => res.json({error}))
})

router.put('/data/user/changeIcon', (req, res) => {
    const username = verifyToken(req.cookies.jwt)
    const {icon} = req.body;

    User.updateOne({username},{$set: {"icon" : icon}})
    .then(result => {
        //console.log(result)
        res.send({success: true, error: 'Successful to change profile picture.'})
    })
    .catch(error => res.json({error}))
})

module.exports = router