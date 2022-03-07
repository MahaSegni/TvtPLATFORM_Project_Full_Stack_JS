const router = require('express').Router();
const interestPointController = require('../controllers/interestPointController')

router.get("/userInterestPoints/:id",interestPointController.userInterestPoints);
router.get("/getAll",interestPointController.getAll);
router.get("/rvFromUser/:idu/:idip",interestPointController.removeFromUser);

module.exports=router;
