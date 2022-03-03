var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Module = new Schema({

    idowner : String,
    label : String,
    description: String,
    sousCategory : SousCategory ,
    nbparticipant : Number, 
    datepub : Date, 
    courses : Courses = [],
    image : String,
    
});

module.exports = mongoose.model('module',Module);