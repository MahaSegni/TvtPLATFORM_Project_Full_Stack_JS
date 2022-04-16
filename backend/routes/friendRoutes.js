const router = require('express').Router();
const friendController = require('../controllers/friendController')

router.get('/getSuggestions/:idUser', friendController.getSuggestions);
router.get('/getMyFriends/:idUser', friendController.getMyFriends);
router.get('/getAllFriends', friendController.getAllFriends);
router.put('/sendRequest/:idUser/:idRcpt', friendController.sendRequest);
router.get('/getRequests/:idUser', friendController.getRequests);
router.put('/rejectRequest/:idUser/:idSender', friendController.rejectRequest);
router.put('/acceptRequest/:idUser/:idSender', friendController.acceptRequest);
router.post('/updateFriend/:idUser/:idFriend', friendController.updateFriend);
router.get('/deleteFriend/:idUser/:idFriend', friendController.deleteFriend);




module.exports=router;