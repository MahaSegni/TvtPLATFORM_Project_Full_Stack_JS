const EvaluationModel = require('../Model/Evaluation');
const ModuleModel = require('../Model/Module');
const QuestionModel = require('../Model/Evaluationquestion');


module.exports.getOwner = async (req, res) => {
  let owner=null;
  const idModule = req.params.idModule;
  if (req.params.idModule !== "null") {
    m=await ModuleModel.findById(idModule)
    if(m.idowner==req.params.idUser){
      owner=true;}
  }
  else{owner=false}
  res.send(owner)
}

module.exports.getEvaluation = async (req, res) => {
  const idModule = req.params.idModule;
  let idUser=req.params.idUser;
  let owner=null
  if (req.params.idModule !== "null") {
    m=await ModuleModel.findById(idModule)
    if(m.idowner===req.params.idUser){
     owner=true;
    }
    else{owner=false}
    if (owner === true) {
      ev = await EvaluationModel.find({ refmodule: idModule });
    }
    else { ev = await EvaluationModel.find({ refmodule: idModule, public: true,
      'submissions.idSubmitter':{$ne :idUser}
    }); }
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
module.exports.evaluationupload = async (req, res, next) => {
  
  let id = req.params.id;
  EvaluationModel.findByIdAndUpdate(
    id,
    { image: req.file.filename },
    { new: true },
    (err, docs) => {
      if (!err)
        return res.send(docs);
      else
        return res.status(400).send("No update here : ");
    });
};


module.exports.addEvaluation = async (req, res) => {
  let m = await ModuleModel.findById(req.params.idModule);
  let e=await new EvaluationModel({
    title: req.body.title,
    image: req.body.image,
    public: false,
    date: new Date(),
    lastEdit: new Date(),
    refmodule: m._id,
    nomModule: m.label,
    containsQuestions: false
  }).save();
  res.send(e._id)
};

module.exports.updateEvaluation = async (req, res, next) => {
  
  let id = req.body._id;
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
  const f = await EvaluationModel.findById(id);
  f.public = !f.public;
  f.save()
  return res.send(f);
};

module.exports.deleteEvaluation = (req, res) => {
  EvaluationModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

