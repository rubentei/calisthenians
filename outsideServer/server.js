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
//GET  /EVENT/PAST/:USERID Ruben

app.get("/event/past/:userid", async (req, res) => {
  try {
    var id = mongoose.Types.ObjectId(req.params.userid);
    console.log(id);
    var query = await event_model.find({"creator": id});
    res.send(query);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET  /EVENTS/:EVENTID/USERS Ruben
//POST /USERS/REGISTER Ric
//POST /USERS/LOGIN  Ric 
//GET  /EVENT/:EVENTID Arya
//GET  /EVENT/NEXT Arya
//POST /EVENT Arya
//PUT  /USERS/:USERID Ric 

app.listen(8080);
console.log("App listening on port 8080");