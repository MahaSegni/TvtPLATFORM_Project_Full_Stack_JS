const categoryModel = require("../Model/CategorieModule");
const ObjectID = require("mongoose").Types.ObjectId;

const ModuleModel = require("../Model/Module.js");
module.exports.readPost = (req, res) => {
    categoryModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};
module.exports.uploadPicture = async (req, res) => {
  let modul=await categoryModel.findById(req.params.id)
  modul.image = req.file.filename
  modul.save()
       res.send("err")
},
module.exports.createCategory = async (req, res) => {
 

  const newPost = new categoryModel({
    label: req.body.label,
    image : req.body.image,
    sous_categorie: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json({
      statue: true,
      message: " category added Succefully",
      result: post,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    label: req.body.label,
  };

  categoryModel.findByIdAndUpdate(
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

    categoryModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.getmodulesfromcategory = async  (req, res) => {
  let modules=[]
  let docs =await categoryModel.findById(req.params.id)

  for(let i in docs.modules)
  {console.log(docs.modules[i]);
    modules.push( await ModuleModel.findById(docs.modules[i] ))}
  console.log (modules)
  res.send(modules)

};

module.exports.addmoduleToCategory = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          modules: 
              req.params.idModule
          ,
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.addsousCATEGORY = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
            sous_categorie: {
              
                label: req.body.label,
                icon: req.body.icon
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.editsouscategory = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return categoryModel.findById(req.params.id, (err, docs) => {
      const sousCategory = docs.sous_categorie.find((sousCategory) =>
      sousCategory._id.equals(req.body.ide)
      );

      if (!sousCategory) return res.status(404).send("subcategory not found");
      sousCategory.label = req.body.label;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.deletesousCategory = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
            sous_categorie: {
                _id: req.body.ide,
                label : "test"
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};