var mongoose = require('mongoose');
const Conversation = require('./Conversation');
const User = require('./User');
var Schema = mongoose.Schema;

var Message = new Schema({
    text : {
        type:String
    },
    image : {
        type:String
    },
    date : {
        type:Date
    },
    refowner : {
        type:String
    },

});

module.exports = mongoose.model('message',Message);