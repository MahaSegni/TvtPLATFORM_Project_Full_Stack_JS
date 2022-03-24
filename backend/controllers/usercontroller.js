//ONLY FOR TEST

//Fonction bech t ajouti user 
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_TVT_PLATFORM_GOOGLE_CLIENT_ID)
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: 'D:/PiMern/Project_Full_Stack_JS/frontend/src/assets/uploads/user' })
var nodemailer = require('nodemailer');
const UserModel = require('../Model/User');
const ModuleModel = require('../Model/Module');
const FriendModel = require('../Model/Friend');
const FriendController = require('../controllers/friendController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tvtplatform@gmail.com',
        pass: 'tvtplatformforpi'
    }
});

const checkIfGoogle = async (email) => {
    await UserModel.findOne({ email: email }, async (err, result) => {
        if (result.typeUser == "googleUser") {
            return true;
        } else {
            return false;
        }
    }).clone()
}

module.exports.checkMail = async (req, res) => {
    try {
        await UserModel.exists({ email: req.params.email }, (err, result) => {
            if (result != null) {
                res.send(true);
            } else { res.send(false) }
        })

    } catch (err) {
        res.send(err)
    }
}


module.exports.sendMail = (req, res) => {
    try {
        let r = (Math.random() + 1).toString(36).substring(7);
        let mailOptions = {
            from: 'tvtplatform@gmail.com',
            to: req.params.email,
            subject: 'Verification code',
            text: 'This is your verification code : ' + r
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.send(error);
            } else {
                res.status(200).send(r)
            }
        });

    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.signUp = async (req, res) => {
    try {
        let user = new UserModel(
            {
                name: req.body.name,
                lastName: req.body.lastname,
                birthDate: req.body.birthDate,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                typeUser: req.body.type,
                image: "user.png",
                state: 0
            })
        bcrypt.hash(user.password, 10, function (err, hash) {
            user.password = hash
            user.save()
            res.status(201).send('success')
        });

    } catch (err) {
        res.send(err)
    }
}

module.exports.signIn = async (req, res) => {

    try {
        UserModel.findOne({ email: req.body.email }, async (err, user) => {
            if (user) {
                if (user.state == -1) {
                    res.send("Account Banned")
                }
                else if (user.password) {
                    let auth = await bcrypt.compare(req.body.password, user.password);
                    if (auth) {
                        let uForJwt = { id: user._id }
                        user.state = user.state + 1
                        user.token = jwt.sign(uForJwt, process.env.ACCESS_TOKEN_SECRET);
                        user.save()
                        res.status(200).send(user)
                    } else {
                        res.send('Incorrect password');
                    }
                } else {
                    res.send('You are Trying to connect with a google account that does not has a password, click Forget Password to create one');
                }
            }
            else {
                res.send('Incorrect email')
            }
        });
    } catch (err) {
        res.send(err)
    }

}

module.exports.signOut = async (req, res) => {
    try {
        UserModel.findById({ _id: req.params.id }, (err, result) => {
            if (result) {
                if ((req.headers['authorization'] == result.token) && (result.state != -1)) {
                    if (result.state > 0) {
                        result.state = result.state - 1
                        result.save()
                    }
                    res.status(200).send('disconnected')
                }
                else res.status(401).send()
            }
        });

    }
    catch (err) {
        res.send(err)
    }
}

module.exports.userCoursePreferences = async (req, res) => {
    try {
        UserModel.findById(req.params.id, (err, user) => {
            if (user) {
                if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                    res.status(200).send(user.coursepreferences)
                } else {
                    res.status(401).send()
                }

            }
        })
    } catch (err) {
        res.send(err)
    }
}

module.exports.removeUserCoursePreferences = async (req, res) => {
    try {
        UserModel.findById(req.params.id, (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                user.coursepreferences.pull(req.params.cp)
                user.save()
                res.status(200).send(user.coursepreferences)
            } else {
                res.status(401).send()
            }
        })

    } catch (err) {
        res.send(err)
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        UserModel.findById(req.body.id, async (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                user.name = req.body.name
                user.lastName = req.body.lastname
                user.birthDate = req.body.birthDate
                user.phone = req.body.phone
                await user.save()
                if (user.typeUser == "googleUser") {
                    user.typeUser = "user"
                }
                res.status(200).send(user)
            } else {
                res.status(401).send()
            }
        })

    } catch (err) {
        res.send(err)
    }
}
module.exports.forgetPassword = async (req, res) => {
    try {
        UserModel.findOne({ email: req.body.email }, async (err, user) => {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                user.password = hash
                if (checkIfGoogle(user.email)) {
                    user.typeUser = "user"
                }
                user.save()
                res.send('success')
            });
        })

    } catch (err) {
        res.send(err)
    }
}
module.exports.changePassword = async (req, res) => {
    try {
        UserModel.findById({ _id: req.body.id }, async (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                let auth = await bcrypt.compare(req.body.currentPassword, user.password);
                if (auth) {
                    bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
                        user.password = hash
                        user.save()
                        res.status(201).send('success')
                    })
                } else {
                    res.send('Incorrect Current password');
                }
            }
            else {
                res.status(401).send()
            }
        })

    } catch (err) {
        res.send(err)
    }
}

module.exports.changeEmail = async (req, res) => {
    try {
        UserModel.findById({ _id: req.body.id }, async (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                let auth = await bcrypt.compare(req.body.currentPassword, user.password);
                if (auth) {
                    let r = (Math.random() + 1).toString(36).substring(7);
                    let mailOptions = {
                        from: 'tvtplatform@gmail.com',
                        to: req.body.email,
                        subject: 'Verification code',
                        text: 'This is your verification code : ' + r
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            res.send(error);
                        } else {
                            res.status(200).send(r)
                        }
                    });
                } else {
                    res.send('Incorrect Current password');
                }
            }
            else {
                res.status(401).send()
            }
        })

    } catch (err) {
        res.send(err)
    }


}

module.exports.changeEmailAction = async (req, res) => {
    try {
        UserModel.findById({ _id: req.body.id }, (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                user.email = req.body.email;
                user.save()
                res.status(200).send(user)
            }
            else {
                res.status(401).send()
            }
        })

    } catch (err) {
        res.send(err)
    }
}

module.exports.deleteUser = async (req, res) => {

    try {
        UserModel.findById({ _id: req.body.id }, async (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                let auth = await bcrypt.compare(req.body.currentPassword, user.password);
                if (auth) {
                    await ModuleModel.find({ idowner: user.id }, (error, modules) => {
                        modules.forEach((e) => {
                            UserModel.updateMany({ refmodules: e._id }, {
                                $pull: { refmodules: e._id },
                            }, (err, result) => {
                                if (err) {
                                    res.send('failed')
                                }
                            })
                            e.remove()
                        })
                    }).clone()
                    let Friends = await FriendController.userFriends(user)
                    for (let i in Friends) {
                        await deleteFriend(user, Friends[i])
                    }
                    for (let j in user.reffriends) {
                        await FriendModel.findByIdAndDelete(user.reffriends[j])
                    }
                    user.remove()
                    res.send('success')
                }
                else {
                    res.send('Incorrect Current password');
                }
            }
            else {
                res.status(401).send()
            }
        })

    } catch (err) {
        res.send(err)
    }
}

module.exports.addUserCoursePreferences = async (req, res) => {
    try {
        UserModel.findById(req.body.id, (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                user.coursepreferences.push(req.body.inputValue)
                user.save()
                res.status(200).send('success')
            } else {
                res.status(401).send()
            }
        })

    } catch (err) {
        res.send(err)
    }
}

module.exports.updateUserCoursePreferences = async (req, res) => {
    try {
        UserModel.findById(req.body.id, (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                user.coursepreferences[user.coursepreferences.indexOf(req.body.cp)] = req.body.inputValue
                user.save()
                res.status(200).send('success')
            } else {
                res.status(401).send()
            }
        })

    } catch (err) {
        res.send(err)
    }
}

module.exports.uploadPicture = async (req, res) => {
    try {
        UserModel.findById(req.params.id, (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                user.image = req.file.filename
                user.save()
                res.status(200).send(user.image)
            } else {
                res.status(401).send()
            }
        })
    } catch (err) {
        res.send(err)
    }
}



module.exports.googleLogin = async (req, res) => {

    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const googleUser = { given_name, family_name, email, picture } = ticket.getPayload();
    await UserModel.findOne({ email: googleUser.email }, async (err, result) => {
        if (result) {
            if (result.state == -1) {
                res.send("Account Banned")
            }
            else {
                let uForJwt = { id: result._id }
                result.state = result.state + 1
                result.token = jwt.sign(uForJwt, process.env.ACCESS_TOKEN_SECRET);
                await result.save()
                result.typeUser = "user"
                res.send(result)

            }
        } else {

            let uForJwt = { id: googleUser.email }
            let user = new UserModel(
                {
                    name: googleUser.given_name,
                    lastName: googleUser.family_name,
                    email: googleUser.email,
                    image: googleUser.picture,
                    typeUser: "googleUser",
                    state: 1,
                    token: jwt.sign(uForJwt, process.env.ACCESS_TOKEN_SECRET)
                })
            await user.save()
            user.typeUser = "user"
            user.phone = ""
            user.birthDate = ""
            res.send(user)
        }
    }).clone()

}


module.exports.getModulesByOwner = async (req, res) => {
    try {
        UserModel.findById(req.params.id, async (err, user) => {
            if (user) {
                if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                    await ModuleModel.find({ idowner: req.params.id }, (errM, modules) => {
                        res.send(modules);
                    }).clone()
                } else {
                    res.status(401).send()
                }
            }
        })

    } catch (err) {
        res.send(err)
    }
}

module.exports.getModulesBySubscriber = async (req, res) => {
    try {
        const userModules = [];
        UserModel.findById(req.params.id, async (err, user) => {
            if (user) {
                if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                    for (let i in user.refmodules) {
                        let result = await ModuleModel.findOne({ _id: user.refmodules[i] })
                        userModules.push(result)

                    }
                    res.status(200).send(userModules)
                } else {
                    res.status(401).send()
                }

            }
        })

    } catch (err) {
        res.send(err)
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        UserModel.findById(req.params.id, async (err, user) => {
            if (user) {
                if ((req.headers['authorization'] == user.token) && (user.typeUser == "admin")) {
                    await UserModel.find((err, users) => {
                        res.send(users)
                    }).clone()
                } else {
                    res.status(401).send()
                }
            }
        })
    } catch (err) {
        res.send(err)
    }
}

module.exports.ban = async (req, res) => {
    try {
        UserModel.findById(req.params.aid, async (err, admin) => {
            if ((req.headers['authorization'] == admin.token) && (admin.typeUser == "admin")) {
                UserModel.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: { state: -1 },
                    },
                    { new: true }, (errror, success) => {
                        if (success) {
                            res.status(200).send('success')
                        }
                    })
            } else {
                res.status(401).send()
            }
        })
    } catch (err) {
        res.send(err)
    }
}

module.exports.unban = async (req, res) => {
    try {
        UserModel.findById(req.params.aid, async (err, admin) => {
            if ((req.headers['authorization'] == admin.token) && (admin.typeUser == "admin")) {
                UserModel.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: { state: 0 },
                    },
                    { new: true }, (errror, success) => {
                        if (success) {
                            res.status(200).send('success')
                        }
                    })
            } else {
                res.status(401).send()
            }
        })
    } catch (err) {
        res.send(err)
    }
}

module.exports.getGeneralInformations = async (req, res) => {
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
    }
}

module.exports.refreshUser = async (req, res) => {
    if (req.params.secret == process.env.ACCESS_TOKEN_SECRET) {
        UserModel.findById(req.params.id, (err, user) => {
            if (user.typeUser == "googleUser") {
                user.typeUser = "user"
            }
            res.send(user)
        })
    }
}

module.exports.autoSignOut = async (req, res) => {
    if (req.params.secret == process.env.ACCESS_TOKEN_SECRET) {
        UserModel.findById({ _id: req.params.id }, (err, result) => {
            if (result != null && result.state > 0) {
                result.state = result.state - 1
                result.save()
            }
            res.status(200).send('disconnected')
        });
    }
}

const deleteFriend = async (user, friend) => {
    for(let i in friend.reffriends){
        await FriendModel.findById(friend.reffriends[i],(err,fr) => {
            if(fr.iduser == user._id){
                fr.remove()
                friend.reffriends.pull(friend.reffriends[i])
                friend.save()
            }
        }).clone()
    }
};