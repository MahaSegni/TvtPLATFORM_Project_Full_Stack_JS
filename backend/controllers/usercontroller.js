//ONLY FOR TEST

//Fonction bech t ajouti user 
require('dotenv').config()
var nodemailer = require('nodemailer');
const UserModel = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tvtplatform@gmail.com',
        pass: 'tvtplatformforpi'
    }
});

module.exports.checkMail = async (req, res) => {
    await UserModel.exists({ email: req.params.email }, (err, result) => {
        if (result != null) {
            res.send(true)
        } else { res.send(false) }
    })
}


module.exports.sendMail = (req,res) => {
    
    let r = (Math.random() + 1).toString(36).substring(7);
    let mailOptions = {
        from: 'tvtplatform@gmail.com',
        to: req.params.email,
        subject: 'Verification code',
        text: 'This is your verification code : '+r
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(r)
        }
    });
}

module.exports.signUp = async (req, res) => {
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
}

module.exports.signIn = async (req, res) => {

    UserModel.findOne({ email: req.body.email }, async (err, user) => {
        if (user) {
            let auth = await bcrypt.compare(req.body.password, user.password);
            if (auth) {
                let uForJwt = { id: user._id }
                user.state = 1
                user.token = jwt.sign(uForJwt, process.env.ACCESS_TOKEN_SECRET);
                user.save()
                res.status(200).send(user)
            } else {
                res.send('Incorrect password');
            }
        }
        else {
            res.send('Incorrect email')
        }
    });
}

module.exports.signOut = async (req, res) => {
    UserModel.findById({ _id: req.params.id }, (err, result) => {
        if (result != null) {
            result.state = 0;
            result.save()
            res.status(200).send('disconnected')
        }
    });
}

module.exports.userCoursePreferences = async (req, res) => {
    UserModel.findById(req.params.id, (err, user) => {
        if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
            res.status(200).send(user.coursepreferences)
        } else {
            res.status(401).send('failed')
        }
    })
}

module.exports.removeUserCoursePreferences = async (req, res) => {
    UserModel.findById(req.params.id, (err, user) => {
        if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
            user.coursepreferences.pull(req.params.cp)
            user.save()
            res.status(200).send(user.coursepreferences)
        } else {
            res.status(401).send('failed')
        }
    })
}

module.exports.updateUser = async (req, res) => {
    UserModel.findById(req.body.id, (err, user) => {
        if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
            user.name = req.body.name
            user.lastName = req.body.lastname
            user.birthDate = req.body.birthDate
            user.phone = req.body.phone
            user.save()
            res.status(200).send(user)
        } else {
            res.status(401).send('failed')
        }
    })
}

module.exports.changePassword = async (req, res) => {
    UserModel.findById({ _id: req.body.id }, async (err, user) => {
        if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
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
            res.send('failed')
        }
    })
}

module.exports.changeEmail = async (req, res) => {
   
    UserModel.findById({ _id: req.body.id }, async (err, user) => {
        if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
            let auth = await bcrypt.compare(req.body.currentPassword, user.password);
            if (auth) {
                let r = (Math.random() + 1).toString(36).substring(7);
                let mailOptions = {
                    from: 'tvtplatform@gmail.com',
                    to: req.body.newEmail,
                    subject: 'Verification code',
                    text: 'This is your verification code : '+r
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.status(200).send(r)
                    }
                });
            } else {
                res.send('Incorrect Current password');
            }
        }
        else {
            res.status(401).send('failed')
        }
    })
}

module.exports.changeEmailAction = async (req, res) => {
    UserModel.findById({ _id: req.body.id },(err,user)=>{
        if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
            user.email = req.body.newEmail;
            user.save()
            res.status(200).send(user)
        }
        else {
            res.status(401).send('failed')
        }       
    })   
}

module.exports.deleteUser = async(req,res) => {
    
    UserModel.findById({ _id: req.body.id },async (err,user)=>{
        if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
            let auth = await bcrypt.compare(req.body.currentPassword, user.password);
            if (auth) {
                user.remove()
                res.send('success')
            }
            else {
                res.send('Incorrect Current password');
            }
        }
        else {
            res.status(401).send('failed')
        }       
    })   
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