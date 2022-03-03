var mongoose = require('mongoose');
const Evaluation = require('./Evaluation');
const Evquestionresponse = require('./Evquestionresponse');
var Schema = mongoose.Schema;

var Evaluationquestion = new Schema({

  texte: {
    type: String
  },
  image: {
    type: String
  },
  responseType: {
    type: String
  },
  responses: {
    type: [
      {
        responsesId:String,

        texte: String,
        image: String,
        value: Number,
        refsubmitters:[String]

      }
    ],
  }


});

module.exports = mongoose.model('evaluationquestion', Evaluationquestion);