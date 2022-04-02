const ModuleModel = require("../Model/Module.js");
const UserModel = require("../Model/User.js");
const CategorieModel = require("../Model/CategorieModule");
const mongoose = require("mongoose");
module.exports = {
  getModule: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await ModuleModel.find({})
          //.populate("idowner")
          // .populate("refStudents")
        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  getToken : async (req, res) => {
    UserTok= await UserModel.findOne({token :req.headers['authorization'] })
    if(UserTok==null){
      return res.send('authorization failed')
    }else{
      res.send('authorization succeeded')
    }},

  getModuleById: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await ModuleModel.findById(req.params.id )
         
        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  getModuleBylabel: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await ModuleModel.findOne({ label: req.params.label })
         
        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },

  addModule: async (req, res) => {
    const newModule = new ModuleModel({
      label: req.body.label,
      description : req.body.description,
      image : req.body.image,
      date_creation : req.body.date_creation,
      statusModule : false,
      idowner : req.body.idowner,
    });
    try {
      const data = await newModule.save();
      res.status(201).json({
        statue: true,
        message: "Module Added Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  updateModule: async (req, res) => {
   // console.log(req.body);
     let modul=await ModuleModel.findById(req.body._id);
     modul.label= req.body.label
     modul.description= req.body.description
     modul.image = req.body.image
     modul.date_update= new Date()
     modul.save()
     return  res.send(modul)
  },

  deleteModule: async (req, res) => {
    try {
     const dataFind = await CategorieModel.updateMany( {
      $pull: { modules: req.params.id },
    });
      const dataFind1 = await UserModel.updateMany(
       
        {
          $pull: { refmodules: req.params.id },
        }
      );
      
      const data = await ModuleModel.findByIdAndRemove(req.params.id);
      res.status(201).json({
        statue: true,
        message: "Module Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  deleteAllModules: async (req, res) => {
    try {
      const data = await ModuleModel.remove({});
      res.status(201).json({
        statue: true,
        message: "Module Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  addUserToModule: async (req, res) => {
    try {
      const dataFind1 = await UserModel.findOne(
        { _id: req.params.idUser });
      const dataFind = await UserModel.updateOne(
        { _id: req.params.idUser },
        {
          $push: { refmodules: req.params.id },
        }
      );
      const dataUpdate = await ModuleModel.updateOne(
        { _id: req.params.id },
        {
          $push: { refStudents: [dataFind1._id] },
        }
      );
      res.status(201).json({
        statue: true,
        message: "Module Updated Succefully",
        result: dataUpdate,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  removeUserFromModule: async (req, res) => {
    try {
      const dataFind = await UserModel.findById(req.params.idUser);

      const dataFind1 = await UserModel.updateOne(
        { _id: req.params.idUser},
        {
          $pull: { refmodules: req.params.id },
        }
      );
      const dataUpdate = await ModuleModel.findByIdAndUpdate(
         req.params.id,
        { $pullAll: { refStudents: [dataFind._id] } },
        { safe: true }
      );
      res.status(201).json({
        statue: true,
        message: "Module Updated Succefully User Removed",
        result: dataUpdate,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  verifowner : async ( req, res) => {
    const dataUpdate = await ModuleModel.findOne(
      { _id: req.params.id },
      { $pullAll: { refStudents} },
      
    );
    let owner=null;
    if(dataUpdate.refStudents._id == req.params.id){
owner = true;
    }else{
       owner=false;
    }
    res.send(owner);
  },
  getUserByEmail: async (req, res) => {
    try {
      const dataFind = await UserModel.findOne({ email: req.params.email });
      res.status(201).json(dataFind);
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  getUserByid: async (req, res) => {
    try {
      const dataFind = await UserModel.findOne({ _id: req.params._id });
      res.status(201).json(dataFind);
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  uploadPicture :async (req, res) => {
    
    let modul=await ModuleModel.findById(req.params.id)
    modul.image = req.file.filename
    modul.save()
       
         res.send("err")
  },


  getOwner : async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
  UserModle.findById(req.params.id,(err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
  }
};




















/*const ModuleModel = require("../model/Module");
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
      ownerId : req.body.ownerId,
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
  */