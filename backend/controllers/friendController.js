const FriendModel = require('../Model/Friend');
const userModel = require('../Model/User');




module.exports.getSuggestions = async (req, res) => {
  const myrequests = [];
  let users = await userModel.find({ _id: { $ne: req.params.idUser } });
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
    }}




    const myfriends = [];
    const notmyfriends = [];
    const myfriendship = [];
    let user = await userModel.findById(req.params.idUser)
    console.log(user);

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
      console.log(test)
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

      if (test === false) { notmyfriends.push(users[i]) }


    }

    res.send(notmyfriends);



  };
  module.exports.getAllFriends = (req, res) => {
    FriendModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
  };


  module.exports.getRequests = async (req, res) => {
    const myrequests = [];
    const users = [];
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
      }}

      res.send(friendRequests);
    }

  
  module.exports.getMyFriends = async (req, res) => {
    const myfriends = [];
    const myfriendship = [];
    let user = await userModel.findById(req.params.iduser)

    for (let i in user.reffriends) {
      let result = await FriendModel.findOne({ _id: i })
      myfriendship.push(result)
    }
    for (let i in myfriendship) {
      let result = await userModel.findOne({ _id: i.iduser })
      myfriends.push(result)

    }
    res.status(200).send(myfriends)

  }

  module.exports.sendRequest = async (req, res) => {
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

      });
  };
  module.exports.acceptRequest = async (req, res) => {
    FriendModel.findByIdAndUpdate(
      req.params.id,
      { $set: { etat: true } },
      { new: true }

    );
    const newFriend = new FriendModel({
      iduser: req.body.iduser,
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

      });
  };

  module.exports.rejectRequest = async (req, res) => {
    let user = await userModel.findById(req.params.idSender)
    const reffriendssender = []
    let idFriendship;
    reffriendssender = user.reffriends;
    for (let i in reffriendssender) {
      let friendfrombase = await FriendModel.findById(i).iduser
      if (friendfrombase.iduser === req.params.iduser) {
        idFriendship = friendfrombase.id
      }
    }
    userModel.findByIdAndUpdate(
      req.params.idSender,

      {
        $pull: { reffriends: idFriendship },
      },
      { new: true });
    FriendModel.findByIdAndRemove(idFriendship, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
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
  module.exports.deleteFriend = async (req, res) => {
    let user = await userModel.findById(req.params.idUser)
    const reffriends = []
    let idFriendship;
    reffriends = user.reffriends;
    for (let i in reffriends) {
      if (FriendModel.findById(i).iduser === req.params.idFriend) {
        idFriendship = FriendModel.findById(i).id
      }
    }
    userModel.findByIdAndUpdate(
      req.params.idUser,
      {
        $pull: { reffriends: req.params.idFriendship },
      },
      { new: true });


    FriendModel.findByIdAndRemove(req.params.idFriendship);

    let friend = await userModel.findById(req.params.idFriend)
    const reffriendsfriend = []
    let idFriendshipfriend;
    reffriendsfriend = friend.reffriends;
    for (let i in reffriendsfriend) {
      if (FriendModel.findById(i).iduser === req.params.idUser) {
        idFriendshipfriend = FriendModel.findById(i).id
      }
    }
    userModel.findByIdAndUpdate(
      req.body.idFriend,
      {
        $pull: { reffriends: idFriendshipfriend },
      },
      { new: true });

    FriendModel.findByIdAndRemove(req.params.idFriendshipfriend);
  };