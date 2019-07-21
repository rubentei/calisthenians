const express = require('express');
const app = express(); // create our app w/ express
const mongoose = require('mongoose'); // mongoose for mongodb
const ObjectId = mongoose.Schema.Types.ObjectId;
const morgan = require('morgan'); // log requests to the console (express4)
const bodyParser = require('body-parser'); // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const cors = require('cors');
const bcrypt = require('bcrypt');


mongoose.connect('mongodb://localhost:27017/calisthenians');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
  'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection succesful');
});

db.collection('places').createIndex({
  'location': "2dsphere"
});

//MODELS

const place_model = mongoose.model('Place', {
  id: ObjectId,
  longitude: Number,
  latitude: Number,
  name: String
});

const user_model = mongoose.model('User', {
  id: ObjectId,
  user: String,
  mail: String,
  password: String,
  description: String
});

const event_model = mongoose.model('Event', {
  id: ObjectId,
  date: Date,
  placeId: ObjectId,
  description: String,
  members: [ObjectId],
  creator: ObjectId
});


//END Points

//GET  /PLACES Ruben

app.get('/places/:lng/:lat', async (req, res) => {
  const lat = parseFloat(req.params.lat);
  const lng = parseFloat(req.params.lng);
  const result = await db.collection('places').find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 15000
      }
    }
  }).toArray();
  res.send(result)
});

//GET  /EVENT/PAST/:USERID Ruben

app.get('/events/past/:userid', async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.userid);
  const result = await db.collection('events').find({
    $and: [{
      "creator": id
    }, {
      "date": {
        $lte: new Date()
      }
    }]
  }).toArray();
  res.send(result)
});

//GET  /EVENTS/:EVENTID/USERS Ruben

app.get('/event/:eventid/users', async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.eventid);
  const result = await db.collection('events').find({
    "_id": id
  }).toArray();
  const members = result[0].members;
  var membersResult = [];
  for (let member of members) {
    const obtained = await db.collection('users').find({
      "_id": member
    }).toArray();
    membersResult.push(obtained[0]);
  };
  res.send(membersResult);
});
//POST /USERS/REGISTER Ric
app.post('/users/register', async (req, res) => {
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;
  await bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    const user = new user_model({
      user: req.body.user,
      mail: req.body.mail,
      password: hash,
      description: ''
    });
    user.save();
    res.send({
      "ok": true
    });
  });
});

//POST /USERS/LOGIN  Ric 
app.post('/users/login', async (req, res) => {
  const user = new user_model(req.body);
  const result = await db.collection('users').findOne({
    "user": user.user
  });
  const myPlaintextPassword = req.body.password;
  const hash = result.password;

  bcrypt.compare(myPlaintextPassword, hash).then(function (response) {
    return response;
  }).then(function (response) {
    res.send({
      "auth": response
    });
  })
});

//GET  /EVENT/:EVENTID Arya
app.get('/event/:eventid', async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.eventid);
  const result = await db.collection('events').find({
    "_id": id
  }).toArray();
  res.send(result);
});

//GET  /EVENT/NEXT Arya
app.get('/events/next', async (req, res) => {
  const dateNow = new Date();
  const result = await db.collection('events').find({
    "date": {
      $gte: dateNow
    }
  }).toArray();
  res.send(result);
});

//POST /EVENT Arya
app.post('/event', async (req, res) => {
  const event = new event_model(req.body);
  const result = await db.collection('events').save(event);
  res.send(result);
});


//PUT  /USERS/:USERID Ric 
app.put('/users/:userid', async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.userid);
  const query = {
    '_id': id
  };
  const description = req.body.description;
  const result = await db.collection('users').findOneAndUpdate(query, {
    $set: {
      "description": description
    }
  });
  res.send(result);
});

app.listen(3000);
console.log("App listening on port 3000");