const router = require('express').Router();
const evaluationquestionController = require('../controllers/evaluationquestionController')

router.get("/get/:idev",evaluationquestionController.getQuestions);
router.post("/add/:idev",evaluationquestionController.addEvaluationQuestion);
//router.put("/update/:id",evaluationquestionController.updateEvaluationQuestion);
//router.delete("/delete/:id",evaluationquestionController.deleteEvaluationQuestion);

module.exports=router;