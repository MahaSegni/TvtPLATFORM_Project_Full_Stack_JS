const router = require('express').Router();
const quizController = require('../controllers/quizcontroller')
router.post("/:idModule/create",quizController.createQuiz);
router.get("/:idModule/findall",quizController.find);
router.get("/delete/:id",quizController.delete);
router.patch("/update",quizController.update);
router.patch("/addQuestion/:id",quizController.addQuestion);
router.get("/find/:id",quizController.findQuizByID)
router.get("/deleteQuestion/:id/:idQuestion",quizController.DeleteQuestion)
router.patch("/addResponseScore",quizController.addScore);
router.patch("/addResponse",quizController.addReponse);
router.get("/findStudent/:studentid",quizController.findStudent);

module.exports=router;