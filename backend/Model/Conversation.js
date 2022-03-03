var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Conversation = new Schema({
    name : {
        type:String
    },
    color : {
        type:String
    },
    theme : {
        type:String
    },
  
    refmembers : {
        type:[String]
    }, 
    refmessages : {
        type:[String]
    }, 
});

module.exports = mongoose.model('conversation',Conversation);