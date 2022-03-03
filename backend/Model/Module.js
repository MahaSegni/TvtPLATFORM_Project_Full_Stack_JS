var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Module = new Schema({
    idwoner : {
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
    refStudents : {
        type:[String]
    },
    refCours : {
        type:[String]
    },
});

module.exports = mongoose.model('module',Module);