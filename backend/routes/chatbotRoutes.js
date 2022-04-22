const router = require('express').Router();
const chatbotController = require('../controllers/chatbotController')

router.post("/add/",chatbotController.addChatbotMessage);
router.get("/get/",chatbotController.getChatbotMessages);
router.get("/get/:idUser",chatbotController.getOneChatbotMessage);
router.post("/submit/:idUser/:id/:value",chatbotController.submitResponse);
router.get("/delete/:id",chatbotController.deleteChatbotMessage);
router.get("/delete/:idUser/:id",chatbotController.deleteChatbotMessageForUser);
router.get("/getGeneralInfo/:id",chatbotController.getGeneralInformations);
module.exports=router;