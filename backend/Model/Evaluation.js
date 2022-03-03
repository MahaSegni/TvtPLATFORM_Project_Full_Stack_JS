var mongoose = require('mongoose');
const Evaluationquestion = require('./Evaluationquestion');
const Module = require('./Module');
const User = require('./User');
var Schema = mongoose.Schema;

var Evaluation = new Schema({

    title : {
        type:String
    },
    image : {
        type:String
    },
    date : {
        type:Date
    },
  
    refquestions : {
        type:[String]
    }, 
    refmodule : {
        type:[String]
    }, 
  
});

module.exports = mongoose.model('evaluation',Evaluation);