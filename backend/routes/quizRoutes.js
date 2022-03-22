const router = require('express').Router();
const quizController = require('../controllers/quizcontroller')
router.post("/:idModule/create",quizController.createQuiz);
router.get("/:idModule/findall",quizController.find);
router.get("/delete/:id",quizController.delete);
router.patch("/update",quizController.update);
router.patch("/addQuestion/:id",quizController.addQuestion);


module.exports=router;