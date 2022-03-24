const router = require('express').Router();
const modulescontroller = require('../controllers/modulescontroller')

router.get('/get', modulescontroller.getModule);
router.get('/getOwner/:id', modulescontroller.getOwner);
//router.get("/get/:idUser/:idModule",modulescontroller.getEvaluation);

router.post('/add', modulescontroller.addModule);
router.get('/getById/:id', modulescontroller.getModuleById);
router.get('/getModuleBylabel/:label', modulescontroller.getModuleBylabel);
router.put('/update', modulescontroller.updateModule);
router.put('/adduser/:id/:idUser', modulescontroller.addUserToModule);
router.delete('/delete/:id', modulescontroller.deleteModule);
router.put('/removeuser/:id/:idUser', modulescontroller.removeUserFromModule);
module.exports=router;