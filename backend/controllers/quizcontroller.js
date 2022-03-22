const quizModel = require('../Model/Quiz');
const ObjectID = require("mongoose").Types.ObjectId;
const UserModel=require('../Model/User')
module.exports.createQuiz = async (req, res) => {

    if (!ObjectID.isValid(req.params.idModule))
    return res.status(400).send("ID unknown : " + req.params.idModule);
  if(req.body.chrono&&req.body.chronoVal)
 {

  const newquiz = new quizModel({
    title: req.body.title,
    chrono: req.body.chrono,
    chronoVal: req.body.chronoVal,
    refModule: req.params.idModule,
    dateQuiz: new Date().toDateString()
    
  });
  
  const quiz = await newquiz.save();
  return res.status(200).send("Quiz added "+quiz);
  }else{
    const newquiz = new quizModel({
      title: req.body.title,
      refModule: req.params.idModule,
      dateQuiz: new Date().toDateString()
    });
    
  const quiz = await newquiz.save();
  return res.status(200).send("Quiz added "+quiz);
  }
}

module.exports.find =  (req, res) => {
 
    if (!ObjectID.isValid(req.params.idModule))
    return res.status(400).send("ID unknown : " + req.params.idModule);
    quizModel.find({refModule :req.params.idModule },(err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
  };

  
module.exports.delete = async (req, res) => {
    User= await UserModel.findOne({token :req.headers['authorization'] })
    if(User==null){
      return res.send('authorization failed')
    }
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
      quizModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (err) console.log("Delete error : " + err);
      else
      return res.status(200).send("Quiz deleted ");

      });
  
  };
  
module.exports.update = async (req, res) => {
  User= await UserModel.findOne({token :req.headers['authorization'] })
  if(User==null){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.body.id))
    return res.status(400).send("ID unknown : " + req.body.id);
    const updatedRecord = {};
  if(req.body.title!=null){
  updatedRecord["title"]=req.body.title;
  }
  if(req.body.chrono!=null){
    updatedRecord["chrono"]=req.body.chrono
  }
  if(req.body.chronoVal!=null){
    updatedRecord["chronoVal"]=req.body.chronoVal

  }
  if(Object.keys(updatedRecord).length !== 0){
    quizModel.findByIdAndUpdate(
    req.body.id,
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

module.exports.addQuestion = async (req, res) => {
  User= await UserModel.findOne({token :req.headers['authorization'] })
  if(User==null){
    return res.send('authorization failed')
  }
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    quizModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            Questions: {
              texte:req.body.texte,
              QuestionType: req.body.QuestionType,
              Responses:req.body.Responses,
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