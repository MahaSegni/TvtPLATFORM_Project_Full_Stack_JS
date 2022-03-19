const router = require('express').Router();
const evaluationquestionController = require('../controllers/evaluationquestionController')

router.get("/get/:idev",evaluationquestionController.getQuestions);
router.post("/add/:idev",evaluationquestionController.addQuestion);
router.put("/update",evaluationquestionController.updateQuestion);
router.get("/delete/:idQuestion/:idEv",evaluationquestionController.deleteQuestion);
router.post("/submit/:idUser/:idev",evaluationquestionController.submitEvaluation);

module.exports=router;