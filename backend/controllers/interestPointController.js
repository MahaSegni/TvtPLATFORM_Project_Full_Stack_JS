const UserModel = require('../Model/User');
const interestPointModel = require('../Model/Interestpoint')

module.exports.getAll = async (req, res) => {
    await interestPointModel.find((error, result) => {
        if (result) {
            res.status(200).send(result)
        }
    })
}

module.exports.userInterestPoints = async (req, res) => {
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
}


module.exports.removeFromUser = async (req, res) => {
    UserModel.findById(req.params.idu, (err, user) => {
        if ((req.headers['authorization'] == user.token) && (user.state == 1)) {
            user.refinterestpoints.pull(req.params.idip)
            user.save()
            res.status(200).send()
        } else {
            res.status(401).send('failed')
        }
    })
}
