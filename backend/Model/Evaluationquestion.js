var mongoose = require('mongoose');
const Evaluation = require('./Evaluation');
var Schema = mongoose.Schema;

var Evaluationquestion = new Schema({

  text: {
    type: String
  },
  responseType: {
    type: String
  },
  responses: {
    type: [
      {
        responsesId:String,
        text: String,
        value: Number,
        refsubmitters:[String]
      }
    ],
  }
});

module.exports = mongoose.model('evaluationquestion', Evaluationquestion);