const UserModel = require('../Model/User');
const interestPointModel = require('../Model/Interestpoint')

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
        let user = await UserModel.findById(req.params.id)
        if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
            for (let i in user.refinterestpoints) {
                let result = await interestPointModel.findOne({ _id: user.refinterestpoints[i] })
                userips.push(result)
            }
            res.status(200).send(userips)
        } else {
            res.status(401).send('failed')
        }
    } catch (err) {
        res.send(err)
    }
}


module.exports.removeFromUser = async (req, res) => {
    try {
        UserModel.findById(req.params.idu, (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
                user.refinterestpoints.pull(req.params.idip)
                user.save()
                res.status(200).send()
            } else {
                res.status(401).send('failed')
            }
        })
    } catch (err) {
        res.send(err)
    }
}
module.exports.addToUser = async (req, res) => {
    try {
        UserModel.findById(req.body.id, (err, user) => {
            if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
                user.refinterestpoints.push(req.body.IPid)
                user.save()
                res.status(200).send()
            } else {
                res.status(401).send('failed')
            }
        })

    } catch (err) {
        res.send(err)
    }
}