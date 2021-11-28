
//declarations 
//express for server and routes
const express = require('express')
//bodyParser for x-www-urlencoded (html form like) variables
const bodyParser = require('body-parser')
// defining the actual app to handle the requests (e.g. push, get, etc.)
const app = express()
const port = 3000
// require the driver to connect to the database
const mongoose = require('mongoose')
// require the class constructor from different file
const FootballPlayer = require('./Football.js')
//defining one object using our new constructor



//make the app use the bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}))

//API ROUTES
//show all FootballPlayers from the database using GET request
app.get('/footballplayer', (req, res) => {
  //find all FootballPlayers in the database and store them in the "result" variable
  //use the Model created in the FootballPlayer.js file to retrieve all FootballPlayer entries from the database
  FootballPlayer.find((err, footballplayers) => {
    //in case there is an error with our FootballPlayer model, we we will send it to the user(postman)
    if (err) {
      res.send("Error occured no footballplayer retrieved")
      return
    }
    //if no error send the array conting FootballPlayers to the user/postman
    res.send(footballplayers)
    //log the result in the console as well
    console.log(footballplayers)
  })
})
// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/footballplayer/:id', (req, res) => {
  const id = req.params.id;
  // this query only returns one element
  FootballPlayer.findById(id, (err, footballplayer) => {
    if (err) {
      res.send("FootballPlayer not found")
      return
    }
    //we will send it back to the user/postman
    res.send(footballplayer)
    console.log(footballplayer)
  })
})

//insert request using POST to add a FootballPlayer into the database
app.post('/footballplayer', (req, res) => {
  console.log("Inserting a footballplayer in the database")
  //inser the FootballPlayer into the database
  // FootballPlayer.save() // insert the FootballPlayer into the database

  let footballplayer = new FootballPlayer({
    age: req.body.age, //Number
    name: req.body.name, //String
    nationality: req.body.nationality, //String
    club: req.body.club,//String
    position: req.body.position || "no specific position",//String
    rightfooted: req.body.rightfooted,//Boolean
    goal : req.body.goal,//Number
    assist : req.body.assist,//Number
    number: req.body.number,//Number
  });
  //inserting a FootballPlayer and checking to see if any errors occured
  footballplayer.save(err => {
    if (err) {
      // if error send a message to let the user know
      res.send(`FootballPlayer not inserted into the database, error is: ${err}`)
      //return to be used in order to not send to res.send and crash the program
      return
    }
    //send a message to the user with the result
    res.send("FootballPlayer inserted into the database")
    console.log("FootballPlayer is in the database")
  })

  //if return runs, code will start from here
  return
})
// -->
// PUT request to update or modify one FootballPlayer from the database
app.put('/footballplayer/:id', (req, res) => {
  console.log("Trying to edit footballplayer")
  console.log(parseInt(req.body.age))


  FootballPlayer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,//String
    age: req.body.age, //Number
    nationality: req.body.nationality,//String
    club: req.body.club,//String
    position: req.body.position || "no specific position",//String
    rightfooted: req.body.rightfooted,//Boolean
    goal : req.body.goal, //Number
    assist : req.body.assist, //Number
    number: req.body.number, //Number
  }, err => {
    if (err) {
      res.send("It didn't edit. The error is: " + err)
      return;
    }
    res.send("It did edit")
  })
})


//delete request using DELETE and a PARAMETER (id)
app.delete('/FootballPlayer/:id', (req, res) => {
  FootballPlayer.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send("FootballPlayer did not delete")
      return
    }
    res.send("FootballPlayer deleted")
    console.log(`FootballPlayer with id ${req.params.id} is now deleted`)
    // console.log("FootballPlayer with id "+req.params.id + "is now deleted")
  })
})

//start the server
app.listen(port, () => {
  //change the link to your database
  mongoose.connect('mongodb+srv://admin:admin@cluster0.plivi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})