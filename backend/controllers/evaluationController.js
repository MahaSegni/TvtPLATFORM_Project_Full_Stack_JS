const EvaluationModel = require('../Model/Evaluation');
const ModuleModel = require('../Model/Module');
module.exports.getOwner = async (req, res) => {
owner=false
  const idModule = req.params.idModule;
  if (req.params.idModule !== "null") {
  m=await ModuleModel.findById(idModule)
  if(m.idowner==req.params.idUser){
  let owner=true;
  }}
  res.send(owner)
}
module.exports.getEvaluation = async (req, res) => {
  const idModule = req.params.idModule;
  owner=false

  if (req.params.idModule !== "null") {
 
    m=await ModuleModel.findById(idModule)
  
    if(m.idowner===req.params.idUser){
     owner=true;
    }
  
    if (owner === true) {
      ev = await EvaluationModel.find({ refmodule: idModule });
    }
    else { ev = await EvaluationModel.find({ refmodule: idModule, public: true }); }
  }
  else { ev = await EvaluationModel.find({ public: true }); }
  res.send(ev)
};

module.exports.getEvaluationById = (req, res) => {
  let id = req.params.id;
  EvaluationModel.findById({ _id: id }, (err, docs) => {
    res.send(docs);
  });
};

module.exports.addEvaluation = async (req, res) => {
  let m = await ModuleModel.findById(req.params.idModule);
  console.log("ok", m)
  new EvaluationModel({
    title: req.body.title,
    image: req.body.image,
    public: false,
    date: new Date(),
    lastEdit: new Date(),
    refmodule: m._id,
    nomModule: m.label
  }).save();
  res.send("ok")
};

module.exports.updateEvaluation = async (req, res, next) => {
  /* let fileName;
   if (req.file !== null) {
     try {
       if (
         req.file.detectedMimeType != "image/jpg" &&
         req.file.detectedMimeType != "image/png" &&
         req.file.detectedMimeType != "image/jpeg"
       )
         throw Error("invalid file");
 
       if (req.file.size > 500000) throw Error("max size");
     } catch (err) {
       const errors = err;
       return res.status(201).json({ errors });
     }
     fileName = Math.floor(Math.random()* Date.now()) + Date.now() + ".jpg";
 
     await pipeline(
       req.file.stream,
       fs.createWriteStream(
         `${__dirname}/../public/uploads/evaluation/${fileName}`
       )
     );
   }
 */
  let id = req.body._id;
  console.log(new Date())
  EvaluationModel.findByIdAndUpdate(
    id,
    { title: req.body.title, lastEdit: new Date() },
    { new: true },
    (err, docs) => {
      if (!err)
        return res.send(docs);
      else
        return res.status(400).send("No update here : ");
    });
};

module.exports.updateStatus = async (req, res, next) => {
  let id = req.params.id;
  console.log(id)
  const f = await EvaluationModel.findById(id);
  f.public = !f.public;
  f.save()
  return res.send(f);
};

module.exports.deleteEvaluation = (req, res) => {
  console.log("ok")
  EvaluationModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
    //res.redirect('/api/evaluation/get')
  });
};