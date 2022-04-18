const router = require('express').Router();
const chatbotController = require('../controllers/chatbotController')

router.post("/add/:idModule",chatbotController.addChatbotMessage);
router.post("/submit/:idUser",chatbotController.submitResponse);
router.get("/delete/:id",chatbotController.deleteChatbotMessage);
router.get("/delete/:id/:idUser",chatbotController.deleteChatbotMessageForUser);

module.exports=router;