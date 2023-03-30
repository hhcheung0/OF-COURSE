const jwt = require('jsonwebtoken')

const jwtSecret = 'csci3100'

// accept a string and return a encoded token
// username should be passed and the encoded token should be store as cookie
// 'newspaperhinson' => 'eyJhbGciOiJIUzI1NiJ9.bmV3c3BhcGVyaGluc29u.0JV5duz--IsSZQIwetVXqjELqrFf2aonaLmAy4XUb6I'
const createToken = (string) => {
    try {
        const token = jwt.sign(string, jwtSecret)
        return token
    }
    catch (error) {
        return { error }
    }
}

// accept a token in String and return the decoded string
// a jwt token should be passed and username is returned
const verifyToken = (token) => {
    try {
        const username = jwt.verify(token, jwtSecret)
        return username
    }
    catch (error) {
        return { error }
    }
}

module.exports = { createToken, verifyToken }