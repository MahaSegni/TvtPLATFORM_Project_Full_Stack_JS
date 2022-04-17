var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cours = new Schema({
  
  title: {
    type: String
  },
  date_creation : {
    type:Date
},
  files: {
    type: [
        { originalname:String,
          typeFile: String,
          filenamelocation: String,
        }
      ],
  },
  comments: {
    type: [
      { ownerComment:String,
        nomUser: String,
        imageUser:String,
        texte: String,
        dateComment: Date
      }
    ],
  },
  texte:{
      type:String
  },
  likers: {
    type: [String],
  },
  

  


});

module.exports = mongoose.model('Cours', Cours);