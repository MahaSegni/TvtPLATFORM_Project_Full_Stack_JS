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
    console.log(req.headers['authorization'])
    const userips = [];
    let user = await UserModel.findOne({ _id: req.params.id })
    for (let i in user.refinterestpoints) {

        let result = await interestPointModel.findOne({ _id: user.refinterestpoints[i] })
        userips.push(result)
    }
    res.send(userips)
}

module.exports.removeFromUser = async (req, res) => {
    let idu = req.params.idu;
    let idip = req.params.idip;
    let user = await UserModel.findOne({ _id: idu });
    user.refinterestpoints.pull(idip)
    user.save()
    res.status(200).send()
}
