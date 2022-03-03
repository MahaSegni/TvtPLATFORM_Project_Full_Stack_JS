var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cours = new Schema({
  
  title: {
    type: String
  },
  file: {
    type: [
        {
          fileId:String,
          typeFile: String,
          lienFile: String,
        }
      ],
  },
  comments: {
    type: [
      {
        commenterId:String,
        nomUser: String,
        text: String,
        dateComment: Date,
      }
    ],
  },
  Texte:{
      type:String
  },
  likers: {
    type: [String],
  },


  


});

module.exports = mongoose.model('Cours', Cours);