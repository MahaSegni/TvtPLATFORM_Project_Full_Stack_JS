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
const chatbotRoutes=require('./routes/chatbotRoutes')

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
app.use('/api/chatbot',chatbotRoutes);

app.use('/api/module',ModulesRoutes);
app.use('/api/category',CategoryRoutes);

app.use('/api/friends',friendRoutes);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})

const io = require("socket.io")(process.env.PORTWS, {
    cors: {
      origin: "http://localhost:3001",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId );
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  let usersnotif = [];
  
  const addUsernotif = (userId, socketId) => {
    !usersnotif.some((user) => user.userId === userId) &&
      usersnotif.push({ userId, socketId });
  };
  
  const removeUsernotif = (socketId) => {
    usersnotif = usersnotif.filter((user) => user.socketId !== socketId );
  };
  
  const getUsernotif = (userId) => {
    return usersnotif.find((user) => user.userId === userId);
  };
  
  
  io.on("connection", (socket) => {
  
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
  
      addUser(userId, socket.id);
      io.emit("getUsers", users);
  
  
    });
    socket.on("addUsernotif", (userId) => {
  
      addUsernotif(userId, socket.id);
      io.emit("getUsersnotif", usersnotif);
  
  
    });
    
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text,image,seen,conversationId }) => {
      const user = getUser(receiverId);
      const sender=getUser(senderId)
      if (user){
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        image,
        seen,
        conversationId,
        sender,
      });}else {addUser(senderId, socket.id);
  
          const user = getUser(receiverId);
      if (user){
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        image,
        seen,
        conversationId,
        sender,
      });}else {console.log("user is disconnected ")}
      }
      
   
     
  
      const usernotif = getUsernotif(receiverId);
      if(usernotif){
  
      
        io.to(usernotif.socketId).emit("getnotif", {
          senderId,
          text,
          image,
        })}else {addUsernotif(receiverId, socket.id)
          const usernotif = getUsernotif(receiverId);
      if (usernotif){
          {  io.to(usernotif.socketId).emit("getnotif", {
                senderId,
                text,
                image,
              })}
  
      }else{console.log("usernotif disconnected")} 
      
      }
      
      
    });
  
    socket.on("sendcurrent", ({  sender,iscurrent  }) => {
  
      io.to(sender.socketId).emit("getCurrent", {
        iscurrent
      });
    });
    socket.on("sendrequestcurrent", ({ senderId, receiverId,conversationId }) => {
  
      const user = getUser(receiverId);
      let sender=getUser(senderId)
   
    if (user){
     { io.to(user.socketId).emit("getRequestCurrent", {
        senderId,
        conversationId,
        sender,
      });}}else{
        do {sender=getUser(senderId);
          try {
          io.to(sender.socketId).emit("getCurrent", {
            iscurrent:false
            
          });}catch {addUser(senderId, socket.id); console.log("trying to send ")}
        } while (sender==undefined);
       
        
      }
    });
  
    
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      removeUsernotif(socket.id);
      io.emit("getUsers", users);
      
      io.emit("getUsersnotif", usersnotif);
      
    });
  });
  
  

