/*
CSCI2720 Group Project Group 5

Group Members:
Chan Tsz Leung (1155127714)
Cheung Hin Hang (1155144254)
Choi Ching Ying (1155108224)
Ng Chun Ying (1155144678) 
Sze Nok Yi Victoria (1155159562)
Yan Hiu Wun (1155142739)
*/


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://stu013:p497734W@cluster0.wenbhsm.mongodb.net/stu013')
const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(){
    console.log("Connection is open...");

    const UserSchema = Schema({
        userId: { type: Number, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: { type: String, required: true},
        fav: { type: Array }
      });
    const User = mongoose.model('User', UserSchema);

    const PrjLocationSchema = Schema({
        locId: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        latitude: { type: String},
        longitude: { type: String},
        number: { type: Number, required: true}
      });
    const PrjLocation = mongoose.model('PrjLocation', PrjLocationSchema);

    const PrjEventSchema = Schema({
        eventId: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        venue: { type: Number, required: true},
        date: { type: String, required: true},
        description: { type: String, required: true},
        presenter: { type: String, required: true},
        price: { type: String, required: true},
        update: {type: String, required: true}
      });
    const PrjEvent = mongoose.model('PrjEvent', PrjEventSchema);

    const PrjCommentSchema = Schema({
        locId: { type: Number, required: true},
        name: { type: String, required: true },
        cmtTitle: { type: String, required: true},
        cmt: {type: String, required: true}
        });

    const PrjComment = mongoose.model('PrjComment', PrjCommentSchema);

    app.post('/login', (req, res) => {
        User
        .findOne({name: req.body['name']})
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

    app.get('/event/read/:eventId', (req,res) => {
        PrjEvent
        .findOne({eventId: req.params.eventId})
        .exec((err, event) => {
            if(err)
                console.log('Event read error: ' + err);
            else
                res.send(event);
        })
    })

    app.post('/event/create', (req,res) => {
        PrjEvent
        .find()
        .sort('-eventId')
        .exec((err, events) => {
            if(err)
                console.log('Event create find error: ' + err);
            else{
                PrjLocation
                .findOne({locId: req.body.venue})
                .exec(function(err, loc) {
                    if (err)
                        console.log('Create event search location error: ' + err)
                    else {
                        if (loc === null){
                            res.status(201).send("Event " + req.body.id + " created but can't update corresponding location event number")
                        }else{
                            loc.number = loc.number + 1;
                            loc.save();
                        }
                    }
                })
                PrjEvent.create({
                    eventId: events[0].eventId + 1,
                    title: req.body.title,
                    venue: req.body.venue,
                    date: req.body.date,
                    description: req.body.description,
                    presenter: req.body.presenter,
                    price: req.body.price,
                    update: req.body.update
                }, (err, event) => {
                    if(err)
                        console.log('Event create error: ' + err);
                    else
                        res.send(event);
                })
            }
        })
    })

    app.put('/event/update', (req,res) => {
        PrjEvent
        .findOne({eventId: req.body.eventId})
        .exec((err, event) => {
            if (err)
                console.log('Event update error: ' + err);
            else{
                PrjLocation
                .findOne({locId: req.body.venue})
                .exec(function(err, loc) {
                    if (err)
                        console.log('Create event search location error: ' + err)
                    else {
                        if (loc === null){
                            res.status(201).send("Event " + req.body.id + " created but can't update corresponding location event number")
                        }else{
                            loc.number = loc.number + 1;
                            loc.save();
                        }
                    }
                })
                PrjLocation
                .findOne({locId: event.venue})
                .exec(function(err, loc) {
                    if (err)
                        console.log('Create event search location error: ' + err)
                    else {
                        if (loc === null){
                            res.status(201).send("Event " + req.body.id + " created but can't update corresponding location event number")
                        }else{
                            loc.number = loc.number - 1;
                            loc.save();
                        }
                    }
                })
                event.title = req.body.title,
                event.venue = req.body.venue,
                event.date = req.body.date,
                event.description = req.body.description,
                event.presenter = req.body.presenter,
                event.price = req.body.price,
                event.update = req.body.update
                event.save();
                res.send(event);
            }
        })
    })

    app.delete('/event/delete/:eventId', (req,res) => {
        PrjEvent
        .findOne({eventId: req.params.eventId})
        .exec((err, event) => {
            if (err)
                console.log('Event update error: ' + err);
            else{
                PrjLocation
                .findOne({locId: event.venue})
                .exec(function(err, loc) {
                    if (err)
                        console.log('Create event search location error: ' + err)
                    else {
                        if (loc === null){
                            res.status(201).send("Event " + req.params.eventId + " created but can't update corresponding location event number")
                        }else{
                            loc.number = loc.number - 1;
                            loc.save();
                        }
                    }
                })
            }
        })
        PrjEvent
        .deleteOne({eventId: req.params.eventId})
        .exec((err, e) => {
            if(err)
                console.log('Event delete error: ' + err);
            else{
                if (e.deletedCount == 1)
                    res.send('Event ' + req.params.eventId + ' deleted.');
                else
                    res.send('Event ' + req.params.eventId + ' not found.');
            }
        })
    })

    app.get('/user/read/:name', (req,res) => {
        User
        .findOne({name: req.params.name})
        .exec((err, user) => {
            if(err)
                console.log('User read error: ' + err);
            else 
                res.send(user);
        })
    })

    app.post('/user/create', (req,res) => {
        User
        .find()
        .sort('-userId')
        .exec((err, users) => {
            if(err)
                console.log('User create find error: ' + err);
            else{
                User.create({
                    userId: users[0].userId + 1,
                    name: req.body.name,
                    password: req.body.password,
                    type: req.body.type,
                    fav: req.body.fav
                }, (err, user) => {
                    if (err) 
                        console.log('User create error: ' + err);
                    else 
                        res.send(user);
                });
            }
        })
    })

    app.put('/user/update', (req,res) => {
        User
        .findOne({name: req.body.name})
        .exec((err, user) => {
            if(err)
                console.log('User update error: ' + err);
            else{
                user.name = req.body.name;
                user.password = req.body.password;
                user.type = req.body.type;
                user.fav = req.body.fav;
                user.save();
                res.send(user);
            }
        })
    })

    app.delete('/user/delete/:name', (req,res) => {
        User
        .deleteOne({name: req.params.name})
        .exec((err, e) => {
            if(err)
                console.log('User delete error: ' + err);
            else{
                if (e.deletedCount == 1)
                    res.send(req.params.name + ' deleted.');
                else
                    res.send(req.params.name + ' not found.');
            }
        })
    })

    app.get('/getLoc', (req, res) => {
        PrjLocation
        .find()
        .exec(function(err, loc) {
            if (err)
                console.log('Get all location error: ' + err);
            else {
                if (loc == null){
                    res.set('Content-Type', 'text/plain');
                    res.status(404).send('Locations not found');
                }else{
                    res.send(loc);
                }
            }
        })
    });  

    app.get('/goneEvents/:update', (req, res) => {
        PrjEvent
        .find({update : { $ne : req.params['update']}})
        .exec((err,e) => {
            result = {number : e.length};
            console.log('Gone events number: ' + e.length);
            res.send(result);
        })
    })

    app.delete('/updateEvent', (req, res) => {
        PrjEvent
        .findOne({update : { $ne : req.body.update}})
        .exec( function(err, event) {
            if(err)
                console.log('Update Event search error: ' + err);
            else {
                console.log('Gone event ID: ' + event.eventId);
                PrjLocation
                .findOne({locId: event.venue})
                .exec(function(err, loc) {
                    if (err)
                        console.log('Create event search location error: ' + err)
                    else {
                        console.log('Event location ID: ' + loc.locId);
                        console.log('Event location number: ' + loc.number);
                        loc.number -= 1;
                        loc.save()
                    }
                })
                PrjEvent
                .deleteOne({ eventId: event.eventId })
                .exec(function(err, e) {
                    if(err)
                        console.log("Update Event delete error: " + err);
                    else
                        console.log('Event ' + event.eventId + ' deleted.');
                });
                res.set('Content-Type', 'text/plain');
                res.send('Events list updated');
            }
        })
    })

    app.post('/createEvent', (req, res) => {
        PrjEvent
        .findOne({eventId: req.body.id})
        .exec(function(err, event) {
            if (err)
                console.log('Create Event search error: ' + err);
            else {
                res.set('Content-Type', 'text/plain');
                if (event === null){
                    PrjEvent
                    .create({
                        eventId : req.body.id,
                        title : req.body.title,
                        venue : req.body.venue,
                        date : req.body.date,
                        description : req.body.description,
                        presenter : req.body.presenter,
                        price : req.body.price,
                        update : req.body.update
                    })
                    PrjLocation
                    .findOne({locId: req.body.venue})
                    .exec(function(err, loc) {
                        if (err)
                            console.log('Create event search location error: ' + err)
                        else {
                            if (loc === null){
                                res.status(201).send("Event " + req.body.id + " created but can't update corresponding location event number")
                            }else{
                                loc.number = loc.number + 1;
                                loc.save();
                                res.status(201).send("Event created & Location number updated");
                            }
                        }
                    })  
                }else{
                    event.update = req.body.update;
                    event.save();
                    res.send("Event already exist and updated timestamp.");
                }
            }
        })
        
    })

    app.post('/createLoc', (req, res) => {
        PrjLocation
        .findOne({locId: req.body.id})
        .exec(function(err, e) {
            if (err)
                console.log('Create Location search error: ' + err);
            else {
                res.set('Content-Type', 'text/plain');
                if (e === null){
                    PrjLocation
                    .create({
                        locId: req.body.id,
                        name: req.body.name,
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                        number: req.body.number
                    })
                    res.status(201).send("Location created");
                }else{
                    res.send("Location already exist.");
                }
            }
        })
        
    })

    //comment.js for detail.js
    app.post('/fav/add', (req,res) => {
        User
        .findOne({name:req.body.name})
        .exec((err, user) => {
            if(err)
                console.log('Comment create find error: ' + err);
            else{
                user.fav[user.fav.length] = req.body.locId;
                user.save();
                res.send(user);
            }
        })
    })

    //comment.js for detail.js
    app.post('/comment/create', (req,res) => {
        PrjComment
        .find()
        .exec((err, comments) => {
            if(err)
                console.log('Comment create find error: ' + err);
            else{
                PrjComment.create({
                    locId: req.body.locId,
                    name: req.body.name,
                    cmtTitle: req.body.cmtTitle,
                    cmt: req.body.cmt
                }, (err, PrjComment) => {
                    if (err) 
                        console.log('Comment create error: ' + err);
                    else 
                        res.send(PrjComment);
                });
            }
        })
    })

    //comment.js for detail.js
    app.get('/getCmt/:locId', (req, res) => {
        PrjComment
        .find({locId: req.params['locId']})
        .exec(function(err, c) {
            if (err)
                console.log('Get all comment error: ' + err);
            else {
                if (c == null){
                    res.set('Content-Type', 'text/plain');
                    res.status(404).send('Comment not found');
                }else{
                    res.send(c);
                }
            }
        })
    }); 

    //SingleMarkerMap.js for detail.js
    app.get('/getLoc/:locId', (req, res) => {
        PrjLocation
        .find({locId: req.params['locId']})
        .exec(function(err, loc) {
            if (err)
                console.log('Get all location error: ' + err);
            else {
                if (loc == null){
                    res.set('Content-Type', 'text/plain');
                    res.status(404).send('Locations not found');
                }else{
                    res.send(loc);
                }
            }
        })
    }); 

    //detail.js
    app.get('/getEvent/:venue', (req, res) => {
        PrjEvent
        .find({venue: req.params['venue']})
        .exec(function(err, e) {
            if (err)
                console.log('Get one event error: ' + err);
            else {
                res.set('Content-Type', 'text/plain');
                if (e == null){
                    res.send();
                }else{
                    res.send(e);
                }
            }
        })
    });  

    app.get('/findFav/:name', (req, res) => {
        User
        .findOne({name: req.params['name']})
        .exec(function(err, e) {
            if (err)
                console.log('Get login user error: ' + err);
            else {
                res.send(e.fav);
            }
        })
    });  

    app.put('/removeFav', (req, res) => {
        User
        .findOne({name: req.body.name})
        .exec(function(err, user) {
            if (err)
                console.log('Get login user error: ' + err);
            else {
                let newOne = [];
                for(let i = 0; i < user.fav.length; i++){
                    if(i == req.body.index)
                        continue;
                    else
                        newOne.push(user.fav[i])
                }
                user.fav = newOne;
                user.save();
                res.send(user.fav);
            }
        })
    });  

    app.get('/findType/:name', (req, res) => {
        User
        .findOne({name: req.params['name']})
        .exec(function(err, e) {
            if (err)
                console.log('Get login user error: ' + err);
            else {
                res.send(e.type);
            }
        })
    });  

    app.get('/testing', (req,res) => {
        User.create({
            userId: 2,
            name: "admin2",
            password: "admin2",
            type: "admin",
            fav: [100,101]
        }, (err, user) => {
            if (err) 
                console.log('User create error: ' + err);
            else 
                console.log(user);
                //res.send(user);
        });     
    })

    app.get('/getUsers', (req, res) => {
        User
        .find()
        .exec((err,e) => {
            if (err)
                console.log('Get all users error: ' + err);
            else
                res.send(e);
        })
    })
})

var port = 3001;
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});