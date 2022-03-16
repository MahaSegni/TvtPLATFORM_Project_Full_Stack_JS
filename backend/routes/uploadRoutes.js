const router = require('express').Router();
const uploadController = require('../controllers/uploadController')
const multer = require("multer");
const upload = multer();

router.post("/evaluation", upload.single("file"),uploadController.Evaluationupload);

module.exports=router;
