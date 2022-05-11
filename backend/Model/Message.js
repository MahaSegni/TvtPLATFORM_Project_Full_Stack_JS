var mongoose = require('mongoose');
const Conversation = require('./Conversation');
const User = require('./User');
var Schema = mongoose.Schema;

var Message = new Schema({
    conversationId : {
        type:String
    },
    image : {
        type:String
    },
    sender : {
        type:String
    },
    text : {
        type:String
    },
    seen:{
        type:Boolean
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message',Message);