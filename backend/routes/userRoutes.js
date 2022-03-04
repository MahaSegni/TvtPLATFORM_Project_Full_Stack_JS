const router = require('express').Router();
const userController = require('../controllers/usercontroller')

router.post("/register",userController.signUp);
module.exports=router;