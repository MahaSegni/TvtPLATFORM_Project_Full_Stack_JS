const mongoose= require("mongoose")
require("dotenv").config({path : "./config/.env"})

//
mongoose.connect("mongodb+srv://"+process.env.DB_USER_PASS+"@cluster0.sfcxu.mongodb.net/tvtplatform",
{ useNewUrlParser: true,
    useUnifiedTopology: true,

},
(err)=>{
    if(!err) console.log("mongo connected");
    else console.log(err);
});