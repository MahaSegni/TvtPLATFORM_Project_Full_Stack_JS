const router = require('express').Router();
const Categorycontroller = require('../controllers/Categorycontroller')

router.get('/get', Categorycontroller.readPost);
router.post('/', Categorycontroller.createPost);
router.put('/:id', Categorycontroller.updatePost);
router.delete('/:id', Categorycontroller.deletePost);
router.patch('/addmoduletocategory/:id/:idModule', Categorycontroller.addmoduleToCategory);

router.patch('/addsouscategory/:id', Categorycontroller.addsousCATEGORY);
router.patch('/editsouscategory/:id/:ide', Categorycontroller.editsouscategory);
router.patch('/deletesouscategory/:id/:ide', Categorycontroller.deletesousCategory);
module.exports=router;