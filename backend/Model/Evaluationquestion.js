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
        responsesId: {
          type: String
        },
        texte: {
          type: String
        },
        image: {
          type: String
        },
        value: {
          type: Number
        },
        refsubmitters: {
          type: [String]
        },

      }
    ],
  }


});

module.exports = mongoose.model('evaluationquestion', Evaluationquestion);