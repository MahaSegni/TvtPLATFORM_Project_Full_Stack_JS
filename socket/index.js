const io = require("socket.io")(8900, {
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
    });
    const usernotif = getUsernotif(receiverId);
      io.to(usernotif.socketId).emit("getnotif", {
        senderId,
        text,
        image,
      })
    
    }else 
    {console.log("user is disconnected")
    const usernotif = getUsernotif(receiverId);
    if (usernotif)
   { io.to(usernotif.socketId).emit("getnotif", {
      senderId,
      text,
      image,
    })}}
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

