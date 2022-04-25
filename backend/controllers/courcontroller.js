const CoursModel = require('../Model/Cours');
const ObjectID = require("mongoose").Types.ObjectId;
const ModuleModel = require('../Model/Module');
const UserModle = require("../Model/User");
const cloudinary=require("../utils/cloudinary");
module.exports.createModule = async (req, res) => {
  const {label} = req.body

  try {
    const module = await ModuleModel.create({label});
    res.status(201).json({ module: module._id});
  }
  catch(err) {
    res.status(200).send({ err })
  }
}
module.exports.getModuleofcours=async (req, res) => {
   User= await UserModle.findOne({token :req.headers['authorization'] })
  if(User==null){
    return res.send('authorization failed')
  }else{
  
  if (!ObjectID.isValid(req.params.idModule))
  return res.status(400).send("ID unknown : " + req.params.idModule);
  ModuleModel.findById(req.params.idModule,(err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })}


 
};


module.exports.create = async(req,res)=>{
  User= await UserModle.findOne({token :req.headers['authorization'] })
  if(User==null){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.params.idModule))
  return res.status(400).send("ID unknown : " + req.params.idModule);
const{title,texte} = req.body
const newCour = new CoursModel({
  title: req.body.title,
  texte: req.body.texte,
  date_creation: new Date().toDateString()
});
const cour = await newCour.save();

     ModuleModel.findByIdAndUpdate(
      req.params.idModule,
      {
        $addToSet: { refCours: cour.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(cour);
        else 
        return res.status(500).send(cour);
      });

}
  
 

module.exports.delete = async (req, res) => {
  User= await UserModle.findOne({token :req.headers['authorization'] })
  if(User==null){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  CoursModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err) console.log("Delete error : " + err);
  });
  ModuleModel.findByIdAndUpdate(
    req.params.idModule,
    {
      $pull: { refCours: req.params.id },
    },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else 
      return res.status(500).send(err);
    });

};

module.exports.find =  (req, res) => {
 
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  CoursModel.findById(req.params.id,(err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
};
module.exports.update = async (req, res) => {
  User= await UserModle.findOne({token :req.headers['authorization'] })
  if(User==null){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    const updatedRecord = {};

  if(req.body.texte!=null){
  updatedRecord["texte"]=req.body.texte;
  }
  if(req.body.title!=null){
  updatedRecord["title"]=req.body.title;
  }
  if(Object.keys(updatedRecord).length !== 0){
    CoursModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
  }else{
    return res.status(400).send("No update here : " + req.params.id);
  }
};

module.exports.likeCours = async (req, res) => {
  User= await UserModle.findOne({token :req.headers['authorization'] })
  if(User==null||User.id!=req.body.id){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
     CoursModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) 
        return res.send(docs);
        else 
        return res.status(400).send("No update here : " + req.params.id);

      }
    );
  
};

module.exports.unlikeCours = async (req, res) => {
  User= await UserModle.findOne({token :req.headers['authorization'] })
  if(User==null||User.id!=req.body.id){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    CoursModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) 
        return res.send(docs);
        else 
        return res.status(400).send("No update here : " + req.params.id);

      }
    );
    
};
module.exports.findOwner=async(req,res)=>
{
  if(!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  UserModle.findById(req.params.id,(err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
}

module.exports.createComment = async (req, res) => {
  User= await UserModle.findOne({token :req.headers['authorization'] })
  if(User==null||User.id!=req.body.ownerComment){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
     CoursModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              ownerComment:req.body.ownerComment,
              nomUser: req.body.nomUser,
              imageUser:req.body.imageUser,
              texte: req.body.texte,
              dateComment: new Date().toDateString(),
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      )
    
  
};
module.exports.deleteComment = async (req, res) => {
  User= await UserModle.findOne({token :req.headers['authorization'] })
  if(User==null){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    CoursModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { comments:{ _id: req.body.id } },
      },
      { new: true },
      (err, docs) => {
        if (!err) 
        return res.send(docs);
        else 
        return res.status(400).send("No update here : " + req.params.id);

      }
    );
    
};

module.exports.UpdateComment = async (req, res) => {
  User= await UserModle.findOne({token :req.headers['authorization'] })
  if(User==null){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  CoursModel.findById(req.params.id, (err, docs) => {
    const comment = docs.comments.find((comment) =>
      comment._id.equals(req.body.id)
    );

    if (!comment) return res.status(404).send("Comment not found");
    comment.texte = req.body.texte; 
    docs.save((err) => {
      if (!err) return res.status(200).send(docs);
      return res.status(500).send(err);
    });
  });
};
module.exports.uploadImage = async (req, res) => {
  /*
  if(req.file){
    return res.send({filename: req.file.filename})
  }*/
  try{
    const result=await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    return res.send({filename:result.secure_url});
  }catch(err){
    return res.send(err);
  }
  
  
};
module.exports.uploadFile = async (req, res) => {
  //originalname:
  //mimetype
  //filename
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  try{
    var result;
console.log(req.file.mimetype)
  if(req.file.mimetype.startsWith("image")){
    result = await cloudinary.uploader.upload(req.file.path);
  }else{
     result = await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" });
  
  }
  console.log(result)
   c=await CoursModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          files: {
          originalname:req.file.originalname,
          typeFile: result.format,
          resource_type: result.resource_type,
          filenamelocation: result.secure_url
          },
        },
      },
      { new: true },
    )
    res.send(c)
  }
    catch(err){
      console.log(err);
      
      return res.send(err);
    }
  

};

