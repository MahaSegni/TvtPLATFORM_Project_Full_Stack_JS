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
    refmodule : {
        type:string
    },
  
    refquestions : {
        type:[String]
    }, 
   
    
});

module.exports = mongoose.model('evaluation',Evaluation);