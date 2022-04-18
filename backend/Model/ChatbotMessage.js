var mongoose = require('mongoose');
const User = require('./User');
var Schema = mongoose.Schema;

var ChatbotMessage = new Schema({

    message : {
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
    submissions : {
        type: [
            {
              submissionsId:String,
              idSubmitter: String,
              value:String
            }
          ],
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatbotMessage',ChatbotMessage);