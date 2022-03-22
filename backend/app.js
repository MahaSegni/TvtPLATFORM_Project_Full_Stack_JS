require("dotenv").config({path : "./config/.env"})
require('./Model/dbConfig')
//Declaration de userrouters
const userRoutes=require('./routes/userRoutes')
const interestPointRoutes=require('./routes/interestPointRoutes')
const courRoutes = require('./routes/coursRoutes')
const quizRoutes=require('./routes/quizRoutes');

const cors = require('cors');

const bodyParser=require("body-parser")
const express=require("express");
const app=express();
var corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//GO TO USER ROUTES
// /api/user howa el lien lekbir fi westou les routes lo5rin mta3 l crud mawjoudin 
// fi /routes/userRoutes
// el lienet el kol yabdw b /api 
app.use('/api/user',userRoutes);
app.use('/api/interestpoint',interestPointRoutes);
app.use('/api/cours',courRoutes);
app.use('/api/quiz',quizRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})

