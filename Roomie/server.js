// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fb = require("firebase");
var task     = require('./app/models/tasks');
var usr = require('./app/models/users');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
var result={};

//Firebase Initialization to roomie-27bba

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDYWf2O7FM3jeuJaXudL37NJkEirABo9rk",
    authDomain: "roomie-27bba.firebaseapp.com",
    databaseURL: "https://roomie-27bba.firebaseio.com",
    storageBucket: "roomie-27bba.appspot.com",
    messagingSenderId: "168102728712"
  };
  fb.initializeApp(config);
var db= fb.database();
function createusers(id, Age, Name, pref){
    console.log('called');
    var user_data = {
      Age: Age,
      Name: Name,
      pref: pref
    };
    console.log('creating user');
    db.ref('/users/'+id+'/').set(user_data);
    console.log('created user in  firebase');
  };

function updateusers(id, Age, Name, pref){
    console.log('called');
    var user_data = {
      Age: Age,
      Name: Name,
      pref: pref
    };
    console.log('updating user');
    db.ref('/users/'+id+'/').set(user_data);
    console.log('updated user in  firebase');
  };

function deleteusers(id){
  console.log('removing user');
  db.ref('/users/'+id+'/').remove();
  console.log('removed user from firebase');
    };



function createTask(id,Creator,Desc,Category,Duedate,Workforce,Assignedto,Priority,Credits,Repeats,Status) {
  console.log('called');
  var task_data={
     Assigned_to: Assignedto,
     Category: Category,
     Creator: Creator,
     Credits: Credits,
     Desc: Desc,
     Due_date: Duedate,
     Priority: Priority,
     Repeats: Repeats,
     Status: Status,
     Work_force: Workforce
   };

     console.log('creating...');
 fb.database().ref('/tasks/'+id+'/').set(task_data);
 console.log('created in  firebase');
}
function updateTask(id,Creator,Desc,Category,Duedate,Workforce,Assignedto,Priority,Credits,Repeats,Status) {
  console.log('called');
  var task_data={
     Assigned_to: Assignedto,
     Category: Category,
     Creator: Creator,
     Credits: Credits,
     Desc: Desc,
     Due_date: Duedate,
     Priority: Priority,
     Repeats: Repeats,
     Status: Status,
     Work_force: Workforce
   };

     console.log('creating...');
 fb.database().ref('/tasks/'+id+'/').set(task_data);
 console.log('created in  firebase');
}
function deleteTask(id) {
  console.log('removing...');
fb.database().ref('/tasks/'+id+'/').remove();
console.log('removed from firebase');
}

function fetchTasks() {
  console.log('fetching...');
fb.database().ref('/tasks/').once("value")
  .then(function(snapshot) {
    result = snapshot.val(); // {first:"Ada",last:"Lovelace"}
    return result;
  });

}
// ROUTES FOR OUR API
// =============================================================================
          // get an instance of the express Router
// middleware to use for all requests
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here
router.route('/users/create')
.post(function(req,res){
  var id = req.body.id;
  var Age =  req.body.Age;
  var Name = req.body.Name;
  var pref = req.body.pref;

  res.send(id + ' ' + Age + ' ' + Name + ' ' + pref);
  createusers(id, Age, Name, pref);
  res.json({ message: 'User created!' });
});

router.route('/users/update')
.post(function(req,res){
  var id = req.body.id;
  var Age =  req.body.Age;
  var Name = req.body.Name;
  var pref = req.body.pref;

  res.send(id + ' ' + Age + ' ' + Name + ' ' + pref);
  updateusers(id, Age, Name, pref);
  res.json({ message: 'User updated!' });
});

router.route('/users/delete')
.post(function(req,res){
  var id = req.body.id;

  res.send(id);
  deleteusers(id);
  res.json({ message: 'User deleted!' });
});
router.route('/tasks/create')
// create a task (accessed at POST http://localhost:8080/api/bears)
.post(function(req, res) {
    // create a new instance of the task model
  console.log('calling');
  var id = req.body.id;
  var Creator = req.body.Creator;
  var Desc = req.body.Desc;
  var Category = req.body.Category;
  var Duedate = req.body.Duedate;
  var Workforce = req.body.Workforce;
  var Assignedto = req.body.Assignedto;
  var Priority = req.body.Priority;
  var Credits = req.body.Credits;
  var Repeats = req.body.Repeats;
  var Status = req.body.Status;

  res.send(id + ' ' + Creator + ' ' + Desc + ' ' + Category + ' ' + Duedate + ' ' + Workforce + ' ' + Assignedto + ' ' + Priority + ' ' + Credits + ' ' + Repeats + ' ' + Status);

  createTask(id,Creator,Desc,Category,Duedate,Workforce,Assignedto,Priority,Credits,Repeats,Status);
  res.json({ message: 'Task created!' });
  // console.log('calling');
  //       createTask(2,2,2,2,2,2,2,2,2,2,2);
    // save the task and check for errors
        


});
// more routes for our API will happen here
router.route('/tasks/delete')
// create a task (accessed at POST http://localhost:8080/api/bears)
.post(function(req, res) {
    // create a new instance of the task model
  console.log('calling');
  var id = req.body.id;


  res.send(id);

  deleteTask(id);
  console.log('deleting');
        // deleteTask(2);
  res.json({ message: 'Task deleted!' });
});
// more routes for our API will happen here
router.route('/tasks/update')
// create a task (accessed at POST http://localhost:8080/api/bears)
.post(function(req, res) {
    // create a new instance of the task model
  console.log('calling');
  var id = req.body.id;
  var Creator = req.body.Creator;
  var Desc = req.body.Desc;
  var Category = req.body.Category;
  var Duedate = req.body.Duedate;
  var Workforce = req.body.Workforce;
  var Assignedto = req.body.Assignedto;
  var Priority = req.body.Priority;
  var Credits = req.body.Credits;
  var Repeats = req.body.Repeats;
  var Status = req.body.Status;

  res.send(id + ' ' + Creator + ' ' + Desc + ' ' + Category + ' ' + Duedate + ' ' + Workforce + ' ' + Assignedto + ' ' + Priority + ' ' + Credits + ' ' + Repeats + ' ' + Status);

  updateTask(id,Creator,Desc,Category,Duedate,Workforce,Assignedto,Priority,Credits,Repeats,Status);

  // console.log('updating');
        // UpdateTask(2,2,2,2,2,3,2,2,2,2,2);

  res.json({ message: 'Task updated!' });
});
// more routes for our API will happen here
router.route('/tasks/fetchAll')
// create a task (accessed at POST http://localhost:8080/api/bears)
.post(function(req, res) {
    // create a new instance of the task model

  console.log('updating');
var all =fetchTasks();
console.log(result);
        res.json(result);
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
