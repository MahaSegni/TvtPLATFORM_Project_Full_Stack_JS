var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Module = new Schema({
    idowner : {
        type:String
    },
    label : {
        type:String
    },
    description: {
        type:String
    },
    image : {
        type:String
    },
    date_creation : {
        type:Date
    },
    date_update : {
        type:Date
    },
    refStudents : {
        type:[String]
    },
    refCours : {
        type:[String]
    },
    statusModule : {
        type : String , default : "Non Publish"
    },
});

module.exports = mongoose.model('module',Module);