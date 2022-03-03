var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Conversation = new Schema({

    name : String,
    color : String,
    theme : String,
    messages : Message = [],
});

module.exports = mongoose.model('conversation',Conversation);