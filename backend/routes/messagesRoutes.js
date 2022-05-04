const router = require("express").Router();
const Message = require("../Model/Message");
const Conversation = require("../Model/Conversation");
const multer = require('multer')
const cloudinary=require("../utils/cloudinary");

var newpath="../frontend/public/chat";
const storage = multer.diskStorage({
  destination: function(req,file,cb) {
      cb(null,newpath);
  },
  filename: function(req,file,cb) {
      cb(null, (Math.random() + 1).toString(36).substring(7)+file.originalname)
  } 
})


const upload=require("../utils/custommulter");
//add

router.post("/upload/:id", upload.single("image"),async (req, res, next) => {

  
        result = await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" });
    
  let id = req.params.id;
 // console.log(req.file);
  
  Message.findByIdAndUpdate(
    id,
    { image: result.secure_url },
    
    { new: true },
    (err, docs) => {
      if (!err){
     
        return res.send(docs);}
      else 
        return res.status(400).send("No update here : ");
    });
    
});

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);


  try {
    const savedMessage = await newMessage.save();
    if (newMessage.seen==false)
  {
    const conver=await Conversation.findById(newMessage.conversationId);
    conver.nbUnseen++;
    for(let i in conver.members)
    {if(conver.members[i]!=newMessage.sender)
     { conver.receiverNotif=conver.members[i]}
    }
    conver.save()
  }
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/delete/:id", async (req, res) => {

  m=await Message.findById(req.params.id)

  await m.remove()
  res.send("ok")
 

});

module.exports = router;
