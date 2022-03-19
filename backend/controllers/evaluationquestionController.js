const EvaluationModel = require('../Model/Evaluation');
const ModuleModel = require('../Model/Module');
const QuestionModel = require('../Model/Evaluationquestion');


module.exports.addQuestion = async (req, res) => {
  let e = await EvaluationModel.findById(req.params.idev);
  let type= req.body.type;
  if(type!=="satisfaction" && type!=="importance" && type!=="agreement" && type!=="utility" ){
    type="satisfaction"
  }

  
  let rep1= "Very satisfied";
  let rep2= "Satisfied";
  let rep3= "Neutral";
  let rep4= "Dissatisfied";
  let rep5= "Very dissatisfied";
 
  if(type=="importance"){
    rep1= "Strongly important";
    rep2= "Important";
    rep3= "Neutral";
    rep4= "Not important";
    rep5= "Not important at all";
  }
  if(type=="agreement"){
    rep1= "Strongly agree";
    rep2= "Agree";
    rep3= "Neutral";
    rep4= "Disagree";
    rep5= "Strongly disagree";
  }
  if(type=="utility"){
    rep1= "Very useful";
    rep2= "Useful";
    rep3= "Neutral";
    rep4= "Not useful";
    rep5= "Not useful at all";
  }

  let q= await new QuestionModel({
    text: req.body.text,
    responseType: type
  }).save();

  e.refquestions.push(q.id);
  e.containsQuestions=true;
  e.save();

  QuestionModel.findByIdAndUpdate(
    q._id,
    {
        responses:[ {
          text: rep1,
          value:5,
        }, 
        {
          text: rep2,
          value:4,
        },
        {
          text: rep3,
          value:3,
        },
        {
          text: rep4,
          value:2,
        },
        {
          text:rep5,
          value:1,
        },
      ]
    },
    { new: true },
    (err, docs) => {
      if (!err) return res.send(docs);
      else return res.status(400).send(err);
    }
  ) 
};

module.exports.getQuestions = async (req, res) => {
  let idev = req.params.idev;
  let questions=[]
  ev=await EvaluationModel.findById(idev)
  for(let i in ev.refquestions){
    q=await QuestionModel.findById(ev.refquestions[i]);
    questions.push(q);
  }
  res.send(questions);
};

module.exports.deleteQuestion = async (req, res) => {
  ev=await EvaluationModel.findById(req.params.idEv)
  ev.refquestions.pull(req.params.idQuestion);
  if (ev.refquestions.length === 0){
    ev.containsQuestions=false;
  }
  ev.save();
  QuestionModel.findByIdAndRemove(req.params.idQuestion, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.updateQuestion = async (req, res) => {
  let id=req.body.id;
  let type= req.body.typeu;
  
  let rep1= "Very satisfied";
  let rep2= "Satisfied";
  let rep3= "Neutral";
  let rep4= "Dissatisfied";
  let rep5= "Very dissatisfied";


  if(type=="importance"){
    rep1= "Strongly important";
    rep2= "Important";
    rep3= "Neutral";
    rep4= "Not important";
    rep5= "Not important at all";
  }
  if(type=="agreement"){
    rep1= "Strongly agree";
    rep2= "Agree";
    rep3= "Neutral";
    rep4= "Disagree";
    rep5= "Strongly disagree";
  }
  if(type=="utility"){
    rep1= "Very useful";
    rep2= "Useful";
    rep3= "Neutral";
    rep4= "Not useful";
    rep5= "Not useful at all";
  }


  QuestionModel.findByIdAndUpdate(
    id,
    {text:req.body.textu,responseType:req.body.typeu,
        responses:[ {
          text: rep1,
          value:5,
        }, 
        {
          text: rep2,
          value:4,
        },
        {
          text: rep3,
          value:3,
        },
        {
          text: rep4,
          value:2,
        },
        {
          text:rep5,
          value:1,
        },
      ]
    },
    { new: true },
    (err, docs) => {
      if (!err) return res.send(docs);
      else return res.status(400).send(err);
    }
  ) 
};


module.exports.submitEvaluation = async (req, res) => {
 let idUser= req.params.idUser
 
 let s=0;
 
 
 
 for(let i in req.body)
 {let q= await QuestionModel.findById(req.body[i].idquestion)

   for (j in q.responses)
   
    { if (q.responses[j]._id==req.body[i].idrps)
      {q.responses[j].refsubmitters.push(idUser);
      s=s+q.responses[j].value
      await q.save()
      }
   
    }
 }
 let r = s/req.body.length
 
 EvaluationModel.findByIdAndUpdate(
  req.params.idev,
  { $push: {
    submissions: {
      idSubmitter: idUser,
      result:r,
      }   }
  },
  { new: true },
  (err, docs) => {
    if (!err) return res.send(docs);
    else return res.status(400).send(err);
  }
) 
}