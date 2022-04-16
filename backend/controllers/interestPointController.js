const UserModel = require('../Model/User');
const interestPointModel = require('../Model/Interestpoint');

module.exports.getAll = async (req, res) => {
    try {
        await interestPointModel.find((error, result) => {
            if (result) {
                res.status(200).send(result)
            }
        }).clone()
    } catch (err) {
        res.send(err)
    }
}

module.exports.userInterestPoints = async (req, res) => {
    try {
        const userips = [];        
        UserModel.findById(req.params.id, async (err, user) => {
            if (user) {
                if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                    for (let i in user.refinterestpoints) {
                        let result = await interestPointModel.findOne({ _id: user.refinterestpoints[i] })
                        userips.push(result)
                    }
                    res.status(200).send(userips)
                } else {
                    res.status(401).send()
                }
            }
        })
    } catch (err) {
        res.send(err)
    }
}


module.exports.removeFromUser = async (req, res) => {
    try {
        UserModel.findById(req.params.idu, (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                user.refinterestpoints.pull(req.params.idip)
                user.save()
                res.status(200).send()
            } else {
                res.status(401).send()
            }
        })
    } catch (err) {
        res.send(err)
    }
}
module.exports.addToUser = async (req, res) => {
    try {
        UserModel.findById(req.body.id, (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state != -1)) {
                user.refinterestpoints.push(req.body.IPid)
                user.save()
                res.status(200).send()
            } else {
                res.status(401).send()
            }
        })

    } catch (err) {
        res.send(err)
    }
}

module.exports.addIP = async (req, res) => {
    try {
        UserModel.findById(req.body.id, async (err, admin) => {
            if ((req.headers['authorization'] == admin.token) && (admin.typeUser == "admin")) {
                let ip = new interestPointModel(
                    {
                        value: req.body.inputValue
                    })
                ip.save()
                res.status(200).send(ip)
            } else {
                res.status(401).send()
            }
        })
    } catch (err) {
        res.send(err)
    }
}

module.exports.deleteIP = async (req, res) => {
    try {
        UserModel.findById(req.params.aid, async (err, admin) => {
            if ((req.headers['authorization'] == admin.token) && (admin.typeUser == "admin")) {
                interestPointModel.findByIdAndRemove(req.params.ipid, (error, result) => {
                    if (!error) {
                        UserModel.updateMany({ refinterestpoints: req.params.ipid }, {
                            $pull: { refinterestpoints: req.params.ipid },
                        }, (err, result) => {
                            if (err) {
                                res.send('failed')
                            }
                        })
                        res.status(200).send()
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

module.exports.updateIP = async (req, res) => {
    try {
        UserModel.findById(req.body.id, async (err, admin) => {
            if ((req.headers['authorization'] == admin.token) && (admin.typeUser == "admin")) {
                interestPointModel.findByIdAndUpdate(req.body.ipId, {
                    $set: { value: req.body.inputValue }
                }, { new: true }, (errror, success) => {
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