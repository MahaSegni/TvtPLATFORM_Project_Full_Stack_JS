const router = require('express').Router();
const userController = require('../controllers/userController')


router.get("/check/:email",userController.checkMail);
router.post("/signup",userController.signUp);
router.post("/signin",userController.signIn);
router.get("/signout/:id",userController.signOut);
router.get("/coursepreferences/:id",userController.userCoursePreferences);
router.get("/removeCP/:id/:cp",userController.removeUserCoursePreferences);
router.put("/update",userController.updateUser);
router.put("/changePassword",userController.changePassword);
router.post("/changeEmail",userController.changeEmail);
router.put("/changeEmailAction",userController.changeEmailAction);
router.post("/deleteUser",userController.deleteUser);
router.get("/sendMail/:email",userController.sendMail);
module.exports=router;