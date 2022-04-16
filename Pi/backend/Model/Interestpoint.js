var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Interestpoint = new Schema({
    value : String,
});

module.exports = mongoose.model('interestpoint',Interestpoint);