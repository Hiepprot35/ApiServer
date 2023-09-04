
const express = require('express');
const messageController=require('../app/controllers/MessageController');

const router=express.Router();

router.post('/',messageController.insertMess)
router.post('/seen',messageController.SeenMess)
router.get('/:conversation_id',messageController.FindMessFollowConver)
router.get('/newest/:conversation_id',messageController.FindNewestMessFollowConver)
router.get('/newest/seen/:conversation_id/:userID',messageController.FindNewstMessFollowConverOfSender)
module.exports=router;