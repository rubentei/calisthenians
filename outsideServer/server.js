var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var ObjectId = mongoose.Schema.Types.ObjectId;
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');


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

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection succesful');
});

db.collection('places').createIndex({'location':"2dsphere"});

//MODELS

var place_model = mongoose.model('Place', {
  id: ObjectId,
  longitude: Number,
  latitude: Number,
  name: String
});

var user_model = mongoose.model('User', {
  id: ObjectId,
  user: String,
  mail: String,
  password: String,
  description: String
});

var event_model = mongoose.model('Event', {
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
          coordinates: [lng,lat]
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
  var members = result[0].members;
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
//POST /USERS/LOGIN  Ric 
//GET  /EVENT/:EVENTID Arya
//GET  /EVENT/NEXT Arya
//POST /EVENT Arya
//PUT  /USERS/:USERID Ric 

app.listen(3000);
console.log("App listening on port 3000");