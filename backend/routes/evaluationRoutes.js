const router = require('express').Router();
const evaluationController = require('../controllers/evaluationController')

router.get("/get",evaluationController.getEvaluation);
router.get("/getById/:id",evaluationController.getEvaluationById);
router.post("/add",evaluationController.addEvaluation);
router.post("/update",evaluationController.updateEvaluation);
router.get("/delete/:id",evaluationController.deleteEvaluation);

module.exports=router;