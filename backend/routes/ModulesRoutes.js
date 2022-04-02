const router = require('express').Router();
const modulescontroller = require('../controllers/modulescontroller')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'C:/Users/mahas/Downloads/Project_Full_Stack_JS-AccountsManagement/Project_Full_Stack_JS-AccountsManagement/frontend/src/assets/uploads/module');
    },
    filename: function(req,file,cb) {
        cb(null, (Math.random() + 1).toString(36).substring(7)+file.originalname)
    } 
})
const upload = multer({storage:storage})
router.get('/get', modulescontroller.getModule);
router.get('/getOwner/:id', modulescontroller.getOwner);
//router.get("/get/:idUser/:idModule",modulescontroller.getEvaluation);
router.get("/getToken/:idUser",modulescontroller.getToken);
router.post('/add', modulescontroller.addModule);
router.get('/getById/:id', modulescontroller.getModuleById);
router.get('/getModuleBylabel/:label', modulescontroller.getModuleBylabel);
router.put('/update', modulescontroller.updateModule);
router.put("/uploadPicture/:id",upload.single('image'),modulescontroller.uploadPicture);
router.put('/adduser/:id/:idUser', modulescontroller.addUserToModule);
router.delete('/delete/:id', modulescontroller.deleteModule);
router.put('/removeuser/:id/:idUser', modulescontroller.removeUserFromModule);
module.exports=router;