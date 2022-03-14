const CoursModel = require('../Model/Cours');
const ObjectID = require("mongoose").Types.ObjectId;
const ModuleModel = require('../Model/Module');
const UserModle = require("../Model/User");
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
  if (!ObjectID.isValid(req.params.idModule))
  return res.status(400).send("ID unknown : " + req.params.idModule);
  ModuleModel.findById(req.params.idModule,(err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
};


module.exports.create = async(req,res)=>{
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
        if (!err) res.send(docs);
        else 
        return res.status(500).send(err);
      });

}
  
 

module.exports.delete = (req, res) => {
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

module.exports.find = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  CoursModel.findById(req.params.id,(err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
};
module.exports.update = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    const updatedRecord = {};

  if(req.body.texte!=null){
  updatedRecord["text"]=req.body.text;
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
