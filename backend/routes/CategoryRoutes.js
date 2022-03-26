const router = require('express').Router();
const Categorycontroller = require('../controllers/Categorycontroller')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'C:/Users/mahas/Desktop/pi/Project_Full_Stack_JS/frontend/src/assets/uploads/module');
    },
    filename: function(req,file,cb) {
        cb(null, (Math.random() + 1).toString(36).substring(7)+file.originalname)
    } 
})
const upload = multer({storage:storage})
router.get('/get', Categorycontroller.readPost);
router.post('/add', Categorycontroller.createCategory);
router.put('/:id', Categorycontroller.updatePost);
router.delete('/delete/:id', Categorycontroller.deletePost);
router.put("/uploadPicture/:id",upload.single('image'),Categorycontroller.uploadPicture);
router.patch('/addmoduletocategory/:id/:idModule', Categorycontroller.addmoduleToCategory);
router.get("/getmodulesfromcategory/:id",Categorycontroller.getmodulesfromcategory);
router.patch('/addsouscategory/:id', Categorycontroller.addsousCATEGORY);
router.patch('/editsouscategory/:id/:ide', Categorycontroller.editsouscategory);
router.patch('/deletesouscategory/:id/:ide', Categorycontroller.deletesousCategory);
module.exports=router;