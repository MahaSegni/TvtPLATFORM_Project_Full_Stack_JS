var mongoose = require('mongoose');
const User = require('./User');
var Schema = mongoose.Schema;

var ChatbotMessage = new Schema({

    text : {
        type:String
    },
    visibility : {
        type:[String]
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
          }
        ]
    },
    refModule:{
      type:String
    },
    submissions : {
        type: [
            {
              submissionsId:String,
              idSubmitter: String,
              value:String
            }
          ],
    },
    own:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatbotMessage',ChatbotMessage);