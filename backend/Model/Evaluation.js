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
    lastEdit: {
        type:Date
    },
    refquestions : {
        type:[String]
    }, 
    refmodule : {
        type:String
    }, 
    nomModule: {
        type: String
    },
    public :{
        type:Boolean
    },
    containsQuestions:{
        type: Boolean
    },

    submissions: {
        type: [
          {
            submissionsId:String,
            idSubmitter: String,
            nameSubmitter: String,
            result: Number,
          
          }
        ],
      }
   
  
});

module.exports = mongoose.model('evaluation',Evaluation);