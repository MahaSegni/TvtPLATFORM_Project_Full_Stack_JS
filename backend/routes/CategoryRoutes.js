const router = require('express').Router();
const Categorycontroller = require('../controllers/Categorycontroller')

router.get('/', Categorycontroller.readPost);
router.post('/', Categorycontroller.createPost);
router.put('/:id', Categorycontroller.updatePost);
router.delete('/:id', Categorycontroller.deletePost);


router.patch('/addsouscategory/:id', Categorycontroller.addsousCATEGORY);
router.patch('/editsouscategory/:id/:ide', Categorycontroller.editsouscategory);
router.patch('/deletesouscategory/:id/:ide', Categorycontroller.deletesousCategory);
module.exports=router;