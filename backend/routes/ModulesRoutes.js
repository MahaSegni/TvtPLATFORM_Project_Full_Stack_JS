const router = require('express').Router();
const modulescontroller = require('../controllers/modulescontroller')

router.get('/', modulescontroller.readPost);
router.post('/', modulescontroller.createPost);
router.get('/:id', modulescontroller.readOne);
router.put('/:id', modulescontroller.updatePost);
router.delete('/:id', modulescontroller.deletePost);

module.exports=router;