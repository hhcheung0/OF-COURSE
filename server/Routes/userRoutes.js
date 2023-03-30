const { Router } = require('express')
const router = Router()

// require models
const User = require('../Models/UserModel')

// get an array of all users
router.get('/data/user', (req, res) => {
    User.find().sort('userID')
    .then(userArray => {
        if (!userArray) return res.json({error: 'user array is empty'})
        return res.json(userArray)
    })
    .catch(error => res.json(error))
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

module.exports = router