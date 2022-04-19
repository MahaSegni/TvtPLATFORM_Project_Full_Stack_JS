const router = require('express').Router();
const chatbotController = require('../controllers/chatbotController')

router.post("/add/",chatbotController.addChatbotMessage);
router.get("/get/",chatbotController.getChatbotMessages);
router.post("/submit/:idUser",chatbotController.submitResponse);
router.get("/delete/:id",chatbotController.deleteChatbotMessage);
router.get("/delete/:id/:idUser",chatbotController.deleteChatbotMessageForUser);
router.get("/getGeneralInfo/:id",chatbotController.getGeneralInformations);
module.exports=router;