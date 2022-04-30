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
    nbUnseen : {
        type:Number,
    },
    receiverNotif:{
        type:String,
        
    },
  
    members: {
        type: Array,
      }, 
   
  
     
});

module.exports = mongoose.model('Conversation',Conversation);