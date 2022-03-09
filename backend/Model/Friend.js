var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Friend = new Schema({
    
    iduser : {
        type:String
    },
   
    type: { type: String, 
            enum : ['friend','closefriend'], 
            default: 'friend' },
    
    etat : {
        type:Boolean
    },
});
module.exports = mongoose.model('friend',Friend);