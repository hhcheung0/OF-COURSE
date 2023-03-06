

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// This module is for parsing the content in a request body (installed with npm)
const bodyParser = require('body-parser');
// Use parser to obtain the content in the body of a request
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
const Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database is open...')
    
    /*app.get('/', (req, res) => {
        res.send('Hello World!')
    })*/

    const UserSchema = Schema({
        name: { type: String, required: true, unique: true },
        userid: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        accessright: { type: Boolean, required: true },
        enrolledcourseid: { type: Array },
        maxCredit: { type: Number },
        passedcourseid: { type: Array },
        shoppingcartcourseid: { type: Array }
      });
    const User = mongoose.model('User', UserSchema);

  
    app.post('/login', (req, res) => {
        User
        .findOne({name: req.body.name})
        .exec(function(err, user) {
            if (err)
                console.log('Get login user error: ' + err);
            else {
                if (user == null){
                    res.send("");
                }else{
                    res.send(user.password);
                }
            }
        })
    });  

})

var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
