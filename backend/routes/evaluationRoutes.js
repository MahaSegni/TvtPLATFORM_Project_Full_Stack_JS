const router = require('express').Router();
const evaluationController = require('../controllers/evaluationController')

router.get("/get/:idModule",evaluationController.getEvaluation);
router.get("/getById/:id",evaluationController.getEvaluationById);
router.post("/add/:idModule",evaluationController.addEvaluation);
router.post("/update",evaluationController.updateEvaluation);
router.post("/updateStatus/:id",evaluationController.updateStatus);
router.get("/delete/:id",evaluationController.deleteEvaluation);

module.exports=router;