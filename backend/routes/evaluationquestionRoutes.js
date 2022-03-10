const router = require('express').Router();
const evaluationquestionController = require('../controllers/evaluationquestionController')

router.get("/get",evaluationquestionController.getEvaluationQuestion);
router.post("/add",evaluationquestionController.addEvaluationQuestion);
router.put("/update/:id",evaluationquestionController.updateEvaluationQuestion);
router.delete("/delete/:id",evaluationquestionController.deleteEvaluationQuestion);

module.exports=router;