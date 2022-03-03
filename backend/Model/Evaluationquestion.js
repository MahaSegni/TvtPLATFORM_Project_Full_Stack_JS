var mongoose = require('mongoose');
const Evaluation = require('./Evaluation');
const Evquestionresponse = require('./Evquestionresponse');
var Schema = mongoose.Schema;

var Evaluationquestion = new Schema({

    texte : String,
    image : String,
    responseType : String,
    responses: {
        type: [
          {
            responsesId:String,
            texte : String,
            image : String,
            value : Number,
            refsubmitters : {
                type:[String]
            }, 
            
          }
        ],
    }  
    

});

module.exports = mongoose.model('evaluationquestion',Evaluationquestion);