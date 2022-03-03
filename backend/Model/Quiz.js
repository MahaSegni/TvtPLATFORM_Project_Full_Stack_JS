var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Quiz = new Schema({
  
  refModule: {
    type: String
  },
  dateQuiz: {
    type: String
  },
  title: {
    type: String
  },
  Questions: {
    type: [
        {
          QuestionId:String,
          texte: String,
          Responses: {
              type:
            [{
                ResponsId:String,
                ReponseType:String,
                valeur:String,
                correct:Boolean,
                idUsers:[String],


              }]
          },
        }
      ],
  },
  Results:{
      type:[
          {
            idUser:String,
            Note:Number,
          }
      ]
  },
  
  chrono: {
    type: Boolean
  },
  chronoVal:{
      type:Number
  }



  


});

module.exports = mongoose.model('Quiz', Quiz);