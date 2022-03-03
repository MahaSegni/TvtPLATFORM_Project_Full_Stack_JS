var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Friend = new Schema({
    iduser : String,
    type : String,
});

module.exports = mongoose.model('friend',Friend);