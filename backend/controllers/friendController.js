const FriendModel = require('../Model/Friend');
const userModel = require('../Model/User');
const UserModle = require('../Model/User');



module.exports.getSuggestions = async (req, res) => {
  UserTok= await UserModle.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
  const myrequests = [];
  let users = await userModel.find({ _id: { $ne: req.params.idUser},typeUser:  { $ne: "admin"} });
  friendship = await FriendModel.find()
  const friendRequests = [];
  for (let i in friendship) {
    if (friendship[i].iduser == req.params.idUser && friendship[i].etat == false) {
      myrequests.push(friendship[i])
    }
  }
  for (let i in myrequests) {
    for (let j in users) {
      for (k in users[j].reffriends) {
        if (users[j].reffriends[k] === myrequests[i].id) {
          friendRequests.push(users[j]);
        }
      }
    }
  }
  const myfriends = [];
  const notmyfriends = [];
  const myfriendship = [];
  let user = await userModel.findById(req.params.idUser)


  for (let i in user.reffriends) {
    let result = await FriendModel.findOne({ _id: user.reffriends[i] })
    myfriendship.push(result)
  }
  for (let i in myfriendship) {
    let result = await userModel.findOne({ _id: myfriendship[i].iduser })
    myfriends.push(result)

  }
  let test = Boolean;

  for (let i in users) {
    test = false;

    for (j in myfriends) {
      if (myfriends[j].id === users[i].id) {
        test = true
      }
    }
    for (j in friendRequests) {
      if (friendRequests[j].id === users[i].id) {
        test = true
      }
    }
    if (test === false) {
      notmyfriends.push(users[i])
    }
  }

  res.send(notmyfriends);}



};


module.exports.getRequests = async (req, res) => {
  UserTok= await UserModle.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
 
  const myrequests = [];
  let users = [];
  const friendRequests = [];
  users = await userModel.find()
  friendship = await FriendModel.find()
  
  for (let i in friendship) {
    if (friendship[i].iduser == req.params.idUser && friendship[i].etat == false) {
      myrequests.push(friendship[i])
    }
  }
  for (let i in myrequests) {
    for (let j in users) {
      for (k in users[j].reffriends) {
        if (users[j].reffriends[k] === myrequests[i].id) {
          friendRequests.push(users[j]);
        }
      }
    }
  }

  res.send(friendRequests);}
}


module.exports.getMyFriends = async (req, res) => {
  UserTok= await UserModle.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
  let myfriends = [];
  let myfriendship = [];
  
  
  let user = await userModel.findById(req.params.idUser)
  if(user.reffriends.length>0){
  
  for (let i in user.reffriends) {
    let result = await FriendModel.findOne({ _id: user.reffriends[i],etat:true })
   if(result!=null){
     myfriendship.push(result)}
  }}

  if(myfriendship.length>0){

  for (let i in myfriendship) {
    let result = await userModel.findOne({ _id: myfriendship[i].iduser })
    myfriends.push(result)
  }}

  res.status(200).send(myfriends)}
}

module.exports.sendRequest = async (req, res) => {
  UserTok= await UserModle.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
  const newFriend = new FriendModel({
    iduser: req.params.idRcpt,
    type: req.body.type,
    etat: false
  });
  const friend = await newFriend.save();
  userModel.findByIdAndUpdate(
    req.params.idUser,
    {
      $addToSet: { reffriends: friend.id },
    },
    { new: true },
    (err, docs) => {
      if (!err)
        return res.send(docs);
      else
        return res.status(400).send("No update here : " + req.params.idUser);

    });}
};
module.exports.acceptRequest = async (req, res) => {
  UserTok= await UserModle.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
    

  let user = await userModel.findById(req.params.idSender)
  let reffriendssender = []
  reffriendssender = user.reffriends;

  let idFriendship;
  for (let i in reffriendssender) {

    let friendfrombase = await FriendModel.findById(reffriendssender[i])

    if (friendfrombase.iduser === req.params.idUser) {

      idFriendship = friendfrombase.id
    }
  }
  
  const f = await FriendModel.findById(idFriendship)
  f.etat = true;
  f.save()



  const newFriend = new FriendModel({
    iduser: req.params.idSender,
    type: req.body.type,
    etat: true
  });
  const friend = await newFriend.save();
  userModel.findByIdAndUpdate(
    req.params.idUser,
    {
      $addToSet: { reffriends: friend.id },
    },
    { new: true },
    (err, docs) => {
      if (!err)
        return res.send(docs);
      else
        return res.status(400).send("No update here : " + req.params.idUser);

    });}
};

module.exports.rejectRequest = async (req, res) => {
  UserTok= await UserModle.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
  let user = await userModel.findById(req.params.idSender)
  let reffriendssender = []
  let idFriendship;
  reffriendssender = user.reffriends;
  for (let i in reffriendssender) {
    let friendfrombase = await FriendModel.findById(reffriendssender[i])
    if (friendfrombase.iduser === req.params.idUser) {
      idFriendship = friendfrombase._id
    }
  }
  let u = await userModel.findById(req.params.idSender);
  await u.reffriends.pull(idFriendship);
  await u.save();

  FriendModel.findByIdAndRemove(idFriendship, (err, docs) => {
    if (!err)
      res.send(docs);
    else
      console.log("Delete error : " + err);
  }).clone;}

};



module.exports.deleteFriend = async (req, res) => {
  UserTok= await UserModle.findOne({token :req.headers['authorization'] })
  if(UserTok==null){
    return res.send('authorization failed')
  }else{
  let user = await userModel.findById(req.params.idUser)
  let reffriends = []
  let idFriendship;
  reffriends = user.reffriends;

  for (let i in reffriends) {let fr=await FriendModel.findById(reffriends[i])
    if (fr.iduser === req.params.idFriend) {
      idFriendship = reffriends[i]
      
    }
  }

  user.reffriends.pull(idFriendship);
  await user.save();




  let friend = await userModel.findById(req.params.idFriend)
  let reffriendsfriend = []
  let idFriendshipfriend;
  reffriendsfriend = friend.reffriends;
  for (let i in reffriendsfriend) {
    let fr=await FriendModel.findById(reffriendsfriend[i])
    if ( fr.iduser === req.params.idUser) {
      idFriendshipfriend = reffriendsfriend[i]
    }
  }
  
  friend.reffriends.pull(idFriendshipfriend);
  await friend.save();

  FriendModel.deleteMany({idFriendshipfriend,idFriendship}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
  }
};
module.exports.updateFriend = async (req, res) => {

  let user = await userModel.findById(req.params.idUser)
  const reffriends = []
  let idFriendship;
  reffriends = user.reffriends;
  for (let i in reffriends) {
    if (FriendModel.findById(i).iduser === req.params.idFriend) {
      idFriendship = FriendModel.findById(i).id
    }
  }
  FriendModel.findByIdAndUpdate(
    idFriendship,
    { $set: { type: req.body.type } },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};
module.exports.getAllFriends = (req, res) => {
  FriendModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};



 async  function MyFriends( idUser) 
 {
  let myfriends = [];
  let myfriendship = [];
  
  
  let user = await userModel.findById(idUser)
  if(user.reffriends.length>0){
  
  for (let i in user.reffriends) {
    let result = await FriendModel.findOne({ _id: user.reffriends[i],etat:true })
   if(result!=null){
     myfriendship.push(result)}
  }}

  if(myfriendship.length>0){

  for (let i in myfriendship) {
    let result = await userModel.findOne({ _id: myfriendship[i].iduser })
    myfriends.push(result)
  }}

  return (myfriends)
};
