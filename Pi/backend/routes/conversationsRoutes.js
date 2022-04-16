const router = require("express").Router();
const Conversation = require("../Model/Conversation");
const UserModle = require('../Model/User');
//new conv

router.post("/", async (req, res) => {
 
  let u=await UserModle.findById(req.body.receiverId)
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    name:"conversation"
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    
    res.send(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update", async (req, res) => {
  c=await Conversation.findById(req.body._id)
  c.name=req.body.name;
  c.save();
  res.send(c);
 

});

router.post("/delete", async (req, res) => {
  c=await Conversation.findById(req.body._id)
  await c.remove()
  res.send("ok")
 

});

module.exports = router;
