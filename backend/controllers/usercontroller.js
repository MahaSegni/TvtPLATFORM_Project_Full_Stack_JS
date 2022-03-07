//ONLY FOR TEST

//Fonction bech t ajouti user 
require('dotenv').config()
const UserModel = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.checkMail = async (req, res) => {
    await UserModel.exists({ email: req.params.email }, (err, result) => {
        if (result != null) {
            res.send(true)
        } else { res.send(false) }
    })
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
        console.log(user)
    bcrypt.hash(user.password, 10, function (err, hash) {
        user.password = hash
        user.save()
        res.status(201).json({ id: user.id })
    });
}

module.exports.signIn = async (req, res) => {

    UserModel.findOne({ email: req.body.email },async (err, user)  => {
        if (user) {
            let auth = await bcrypt.compare(req.body.password, user.password);
            if (auth) {
                let uForJwt = {id : user._id}
                user.state = 1
                user.token = jwt.sign(uForJwt,process.env.ACCESS_TOKEN_SECRET);
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
