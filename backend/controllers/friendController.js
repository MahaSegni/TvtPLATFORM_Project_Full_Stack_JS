const userModel = require('../Model/User');
const FriendModel = require('../Model/Friend');

module.exports.userFriends = async (user) => {
    let myfriends = [];
    let myfriendship = [];
    if (user.reffriends.length > 0) {
        for (let i in user.reffriends) {
            let result = await FriendModel.findOne({ _id: user.reffriends[i], etat: true })
            if (result != null) {
                myfriendship.push(result)
            }
        }
    }
    if (myfriendship.length > 0) {
        for (let i in myfriendship) {
            let result = await userModel.findOne({ _id: myfriendship[i].iduser })
            myfriends.push(result)
        }
    }
    return (myfriends)
};

