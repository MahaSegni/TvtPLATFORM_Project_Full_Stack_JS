const router = require('express').Router();
const friendController = require('../controllers/friendController')

router.get('/getSuggestions/:idUser', friendController.getSuggestions);
router.get('/getMyFriends/:idUser', friendController.getMyFriends);
router.get('/getAllFriends', friendController.getAllFriends);
router.get('/sendRequest/:idUser/:idRcpt', friendController.sendRequest);
router.post('/getRequests/:idUser', friendController.getRequests);
router.post('/rejectRequest/:idUser/:idSender', friendController.rejectRequest);
router.post('/updateFriend/:idUser/:idFriend', friendController.updateFriend);
router.post('/deleteFriend/:idUser/:idFriend', friendController.deleteFriend);




module.exports=router;