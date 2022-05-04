const router = require("express").Router();
const Conversation = require("../Model/Conversation");
const Message = require("../Model/Message");
const UserModle = require('../Model/User');
//new conv

router.post("/", async (req, res) => {
 
  let u=await UserModle.findById(req.body.receiverId)
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    name:"conversation",
    nbUnseen:0,
    receiverNotif:null
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
  let m=[]
  c=await Conversation.findById(req.body._id)
  m=await Message.find({conversationId: c._id});

  for (let i in m){
    await m[i].remove();
  }
  await c.remove()
  res.send("ok")
 

});
router.get("/get/:Id", async (req, res) => {
  try {
    
    const conversation = await Conversation.findById(req.params.Id);
    res.send(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/markasseen", async (req, res) => {
  let c=await Conversation.findById(req.body._id)
  c.nbUnseen=0
  c.receiverNotif=null
  await c.save()

  res.send("ok")


});
router.get("/getnotif/:idUser",async(req,res)=>
{ let tabnotif=[]
  let conversations=await Conversation.find();
  for (let i in conversations){
    if (conversations[i].receiverNotif==req.params.idUser)
    {let notif={conversationId:conversations[i]._id,nbUnseen:conversations[i].nbUnseen}
     tabnotif.push(notif)
    }
  }
  if(tabnotif.length>0){
   
  res.send(tabnotif)}else
  res.send(null)
})
/*router.get("/gettotalnotif/:idUser",async(req,res)=>
{ let s=0
  let conversations=await Conversation.find();
  for (let i in conversations){
    if (conversations[i].receiverNotif==req.params.idUser)
    { s=s+conversations[i].nbUnseen 
    
    }
  }

  res.send(String(s))
})*/


module.exports = router;
