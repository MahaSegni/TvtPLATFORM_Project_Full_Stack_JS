var mongoose = require('mongoose');
const Conversation = require('./Conversation');
const User = require('./User');
var Schema = mongoose.Schema;

var Message = new Schema({
    text : String,
    image : String,
    date : Date,
    owner : User,
    conversation : Conversation,
});

module.exports = mongoose.model('message',Message);