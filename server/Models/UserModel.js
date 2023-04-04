const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userID: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessRight: { type: Boolean, required: true },
    maxCredit: { type: Number },
    enrolledCourse: { type: Object },
    completedCourse: { type: Object }, //stores the completed course ID, 
    shoppingCartCourse: { type: Object }
});

const User = mongoose.model('User', userSchema);

module.exports = User