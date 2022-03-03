var mongoose = require('mongoose');
const User = require('./User');
var Schema = mongoose.Schema;

var Chatbot = new Schema({

    name : String,
    image : String,
    language : String,
    user : User
});

module.exports = mongoose.model('user',User);