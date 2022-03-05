const router = require('express').Router();
const userController = require('../controllers/usercontroller')


router.get("/check/:email",userController.checkMail);
router.post("/signup",userController.signUp);
router.post("/signin",userController.signIn);
router.get("/signout/:id",userController.signOut);
module.exports=router;