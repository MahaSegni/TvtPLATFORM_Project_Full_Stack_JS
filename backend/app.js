require("dotenv").config({path : "./config/.env"})
require('./Model/dbConfig')
//Declaration de userrouters
const userRoutes=require('./routes/userRoutes')
const interestPointRoutes=require('./routes/interestPointRoutes')
const courRoutes = require('./routes/coursRoutes')
const quizRoutes=require('./routes/quizRoutes');
const evaluationRoutes=require('./routes/evaluationRoutes')
const evquestionRoutes=require('./routes/evaluationquestionRoutes')
const friendRoutes=require('./routes/friendRoutes')
const conversationRoute = require("./routes/conversationsRoutes");
const messageRoute = require("./routes/messagesRoutes");
const ModulesRoutes=require('./routes/ModulesRoutes')
const CategoryRoutes=require('./routes/CategoryRoutes')
const ModuleReco=require('./routes/CategoryRoutes')
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

app.use('/api/evaluation',evaluationRoutes);
app.use('/api/evquestion',evquestionRoutes);

app.use('/api/module',ModulesRoutes);
app.use('/api/category',CategoryRoutes);

app.use('/api/friends',friendRoutes);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})

