const ModuleModel = require("../model/Module");
const ObjectID = require("mongoose").Types.ObjectId;
const ValidateModule = require("../validation/Module.Validation");

module.exports.readPost = (req, res) => {
    ModuleModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
  };

  module.exports.readOne = (req, res) => {
    ModuleModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
    })
  
  };
  
  module.exports.createPost = async (req, res) => {
    const { errors, isValid }=  ValidateModule(req.body)

   
    const newPost = new ModuleModel({
      label: req.body.label,
      description: req.body.description,
      date_creation :  new Date().getTime()
       });
try{
  if (!isValid) {
  return res.status(400).json(errors);
} else {
  const post = await newPost.save();
  return res.status(201).json({ message: "Module added with success" });
}
}catch(error){
  console.log(error.message);
}

  };
  
  module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    label: req.body.label,
    description: req.body.description,
    image: req.body.image
  };

  ModuleModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};
  
  module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    
      ModuleModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);

    
    });
    
  };
  