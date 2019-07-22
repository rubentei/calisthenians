const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const users = require('./users');
const events = require('./events');
const places = require('./places');


mongoose.connect('mongodb://localhost:27017/calisthenians');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
  'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
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


//END Points

//POST /PLACES (CHECKED)
app.post('/places', async (req, res) => {
  const newPlace = new places.place_model(req.body);
  console.log(new places.place_model(newPlace));
  const result = await db.collection('places').save(newPlace);
  res.send(result);
});


//GET  /PLACES (CHECKED)
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

//GET  /EVENTS/PAST/:USERID (CHECKED)
app.get('/events/past/:userid', async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.userid);
  console.log(id);
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

//GET  /EVENT/:EVENTID/USERS (CHECKED)
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

//POST /USERS/REGISTER (CHECKED)
app.post('/users/register', async (req, res) => {
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;
  await bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    const user = new users.user_model({
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

//POST /USERS/LOGIN  (CHECKED)
app.post('/users/login', async (req, res) => { 
  const user = new users.user_model(req.body);
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

//GET  /EVENT/:EVENTID (CHECKED)
app.get('/event/:eventid', async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.eventid);
  const result = await db.collection('events').find({
    "_id": id
  }).toArray();
  res.send(result);
});

//GET  /EVENTS/NEXT (CHECKED)
app.get('/events/next', async (req, res) => {
  const dateNow = new Date();
  const result = await db.collection('events').find({
    "date": {
      $gte: dateNow
    }
  }).toArray();
  res.send(result);
});

//POST /EVENT (CHECKED)
app.post('/event', async (req, res) => {
  const event = new events.event_model(req.body);
  const result = await db.collection('events').save(event);
  res.send(result);
});


//PUT  /USERS/:USERID (CHECKED)
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
  res.send({"ok": true});
});

app.listen(3000);
console.log("App listening on port 3000");