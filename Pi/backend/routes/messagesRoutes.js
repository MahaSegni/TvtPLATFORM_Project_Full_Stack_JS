const router = require("express").Router();
const Message = require("../Model/Message");
const multer = require('multer')


var newpath="../frontend/public/chat";
const storage = multer.diskStorage({
  destination: function(req,file,cb) {
      cb(null,newpath);
  },
  filename: function(req,file,cb) {
      cb(null, (Math.random() + 1).toString(36).substring(7)+file.originalname)
  } 
})


const upload =  multer({storage:storage})
//add

router.post("/upload/:id", upload.single("image"),async (req, res, next) => {
  
  let id = req.params.id;
 // console.log(req.file);
  
  Message.findByIdAndUpdate(
    id,
    { image: req.file.filename },
    
    { new: true },
    (err, docs) => {
      if (!err){
      console.log(docs)
        return res.send(docs);}
      else 
        return res.status(400).send("No update here : ");
    });
    
});

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
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

module.exports = router;
