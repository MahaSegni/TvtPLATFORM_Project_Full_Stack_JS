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

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  socket.on("addUserBot", (userId) => {

    addUserBot(userId, socket.id);
    io.emit("getUsersBot", usersBot);


  });

  //take userId and socketId from user
  socket.on("addUser", (userId) => {

    addUser(userId, socket.id);
    io.emit("getUsers", users);


  });
  
  

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text,image,seen,conversationId }) => {
    const user = getUser(receiverId);
    const socket=getUser(senderId)
  
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
      image,
      seen,
      conversationId,
      socket,
    });
  });

  socket.on("sendcurrent", ({  socket,iscurrent  }) => {

    io.to(socket.socketId).emit("getCurrent", {
      iscurrent
    });
  });
  socket.on("sendrequestcurrent", ({ senderId, receiverId,conversationId }) => {

    const user = getUser(receiverId);
    const socket=getUser(senderId)
  
    io.to(user.socketId).emit("getRequestCurrent", {
      senderId,
      conversationId,
      socket,
    });
  });

  //-----Bot-----//
let usersBot = [];

const addUserBot = (userId, socketId) => {
  !usersBot.some((user) => user.userId === userId) &&
    usersBot.push({ userId, socketId });
};

const removeUserBot = (socketId) => {
  usersBot = usersBot.filter((user) => user.socketId !== socketId);
};

const getUserBot = (userId) => {
  return usersBot.find((user) => user.userId === userId);
};
//send and get message
socket.on("sendMessageBot", ({ senderId, receiverId, message }) => {
  const user = getUser(receiverId);
  
});

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
    io.emit("getUsersBot", usersBot);
  });
});

