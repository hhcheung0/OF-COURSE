const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userID: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessRight: { type: Boolean, required: true },
    maxCredit: { type: Number },
    enrolledCourseID: { type: Array },
    passedCourseID: { type: Array },
    shoppingCartCourseID: { type: Array }
  });

const User = mongoose.model('User', userSchema);

module.exports = User