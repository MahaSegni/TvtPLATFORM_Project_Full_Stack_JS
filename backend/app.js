require("dotenv").config({path : "./config/.env"})
require('./Model/dbConfig')
//Declaration de userrouters
const userRoutes=require('./routes/userRoutes')

const bodyParser=require("body-parser")
const express=require("express");
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//GO TO USER ROUTES
// /api/user howa el lien lekbir fi westou les routes lo5rin mta3 l crud mawjoudin 
// fi /routes/userRoutes
// el lienet el kol yabdw b /api 
app.use('/api/user',userRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})