const router = require('express').Router();
const evaluationController = require('../controllers/evaluationController')
const multer = require('multer')

var newpath="../frontend/src/assets/uploads/evaluation";


const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,newpath);
    },
    filename: function(req,file,cb) {
        cb(null, (Math.random() + 1).toString(36).substring(7)+file.originalname)
    } 
})

const upload=require("../utils/custommulter");

router.get("/get/:idUser/:idModule",evaluationController.getEvaluation);
router.get("/getToken/:idUser",evaluationController.getToken);
router.get("/getOwner/:idUser/:idModule",evaluationController.getOwner);
router.get("/getById/:id",evaluationController.getEvaluationById);
router.post("/add/:idModule",evaluationController.addEvaluation);
router.post("/update",evaluationController.updateEvaluation);
router.post("/updateStatus/:id",evaluationController.updateStatus);
router.get("/delete/:id",evaluationController.deleteEvaluation);
router.put("/upload/:id", upload.single("image"),evaluationController.evaluationupload);


module.exports=router;