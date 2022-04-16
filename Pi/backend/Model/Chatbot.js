var mongoose = require('mongoose');
const User = require('./User');
var Schema = mongoose.Schema;

var Chatbot = new Schema({

    name : {
        type:String
    },
    image : {
        type:String
    },
    language : {
        type:String
    },
    refUser : {
        type:String
    },

});

module.exports = mongoose.model('user',User);