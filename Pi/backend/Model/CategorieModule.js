var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorieModule = new Schema({

  label: {
    type: String
  },
  image: {
    type: String
  },
  
  sous_categorie: {
    type: [
      {
        categorieId:String,
        label: String,
        icon: String,
      }
    ],
  },
  modules:{
      type:[String]
  }


  


});

module.exports = mongoose.model('CategorieModule', CategorieModule);