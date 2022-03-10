const router = require('express').Router();
const coursRoutes = require('../controllers/courcontroller')
const multer = require("multer");
const upload = multer();
router.post("/testcreateModule",coursRoutes.createModule);
router.get("/getModuleofcours/:idModule",coursRoutes.getModuleofcours);
router.post("/:idModule/create",coursRoutes.create);
router.delete("/delete/:id",coursRoutes.delete);
router.get("/find/:id",coursRoutes.find);
router.put('/update/:id', coursRoutes.update);
router.patch('/like-cours/:id', coursRoutes.likeCours);
router.patch('/unlike-cours/:id', coursRoutes.unlikeCours);
router.get('/getModuleowner/:id',coursRoutes.findOwner);


module.exports=router;