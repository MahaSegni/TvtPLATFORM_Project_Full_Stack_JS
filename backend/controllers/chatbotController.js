const ChatbotModel = require('../Model/ChatbotMessage');
const ModuleModel = require('../Model/Module');
const UserModel = require('../Model/User');


  
module.exports.addChatbotMessage = async (req, res) => {
  UserTok= await UserModel.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
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
  
    let visibility= req.body.visibility
    
  console.log("visibility",visibility)
  console.log("idModule"+req.body.idModule)
    let tabVisibility=[]
    if(visibility=="site"){
        tabVisibility.push("site")
    }else if(visibility=="module"){
     
        let m = await ModuleModel.findById(req.body.idModule);
        tabVisibility=m.refStudents; }
        console.log(tabVisibility)
    let c=await new ChatbotModel({
        responseType: type,
        message: req.body.message,
        visibility:tabVisibility,
        refModule:req.body.idModule
    }).save();

    ChatbotModel.findByIdAndUpdate(
        c._id,
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
  }};

  module.exports.submitResponse = async (req, res) => {
    UserTok= await UserModel.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
    let c= await ChatbotModel.findById(req.body.id)
    if(c.visibility[0]=="site"){
        ChatbotModel.findByIdAndUpdate(
            req.body.id,
            { $push: {
              submissions: {
                idSubmitter: req.params.idUser,
                value:req.body.value,
                }   }
            },
            { new: true },
            (err, docs) => {
              if (!err) return res.send(docs);
              else return res.status(400).send(err);
            }
          ) 
    }else{
        ChatbotModel.findByIdAndUpdate(
            req.body.id,
            { $push: {
              submissions: {
                idSubmitter: req.params.idUser,
                value:req.body.value,
                }   }
            },
            { $pull: {
                visibility: 
                    req.params.idUser
                    }
              },
            { new: true },
            (err, docs) => {
              if (!err) return res.send(docs);
              else return res.status(400).send(err);
            }
        ) 
    }
   }};
  
   module.exports.deleteChatbotMessageForUser = async (req, res) => {
    UserTok= await UserModel.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
    let c= await ChatbotModel.findById(req.params.id)
    let userId=req.params.idUser;
    ChatbotModel.findByIdAndUpdate(
        req.params.id,
        { $pull: {
            visibility: 
                req.params.idUser
                }
          },
        { new: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
    ) 
  }};

  module.exports.deleteChatbotMessage = async (req, res) => {
    UserTok= await UserModel.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
    await ChatbotModel.findByIdAndRemove(req.params.id)
    res.send("Chatbot message deleted");
  }};

  module.exports.getChatbotMessages = async (req, res) => {
    UserTok= await UserModel.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
    let m=await ChatbotModel.find()
    res.send(m);
  }};

  module.exports.getGeneralInformations = async (req, res) => {
   if(req.params.id!="null"){
    try {
        UserModel.findById(req.params.id, (err, user) => {
            user.password = null
            user.token = null
            user.refmodules = null
            user.reffriends = null
            user.typeUser = null
            res.send(user)
        })
    }
    catch (err) {
        res.send(err)
    }}else res.send(null)
}