const router = require('express').Router();
const coursRoutes = require('../controllers/courcontroller')
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../frontend/public/courUploads/");
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.split(".");
      ext = ext[ext.length - 1];
      cb(null, `${Date.now()}.${ext}`);
    }
  });
const upload = multer({storage:storage})
router.post("/testcreateModule",coursRoutes.createModule);
router.get("/getModuleofcours/:idModule",coursRoutes.getModuleofcours);
router.post("/:idModule/create",coursRoutes.create);
router.get("/delete/:idModule/:id",coursRoutes.delete);
router.get("/find/:id",coursRoutes.find);
router.put('/update/:id', coursRoutes.update);
router.patch('/like-cours/:id', coursRoutes.likeCours);
router.patch('/unlike-cours/:id', coursRoutes.unlikeCours);
router.get('/getModuleowner/:id',coursRoutes.findOwner);
router.post('/:id/addComment',coursRoutes.createComment);
router.patch('/:id/deleteComment', coursRoutes.deleteComment);
router.patch('/:id/UpdateComment', coursRoutes.UpdateComment);
router.post("/uploadimage", upload.single("files"),coursRoutes.uploadImage);


module.exports=router;