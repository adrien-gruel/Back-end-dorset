//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema 
const footballplayerSchema = new Schema({
    age: Number, 
    name: String,
    nationality: String,
    club: String,
    position: String,
    rightfooted: Boolean,
    goal : Number,
    assist : Number,
    number: Number,
})
//defining the name of the constructor for our class
const FootballPlayer = mongoose.model('FootballPlayer', footballplayerSchema);
//export the class, also called a model or a document, to use in different files
module.exports = FootballPlayer

//here are sone test for the schema
// let messi = new FootballPlayer(34, 'Lionel Messi', 'Argentine', 'PSG', 'LW', false, 1, 0, 10);
// let ronaldo = new FootballPlayer(36, 'Cristiano Ronaldo', 'Portugal', 'MU', 'ST', true, 5, 0, 7);
// console.log(messi);
// console.log(ronaldo)