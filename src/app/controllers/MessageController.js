const Message_Conversation = require('../models/message.model');
const { create } = require('../models/user.model');
class MessageController {
    async insertConVersation(req, res, next) {
        const data = {
            user1: req.body.user1,
            user2: req.body.user2
        }
        console.log(data)
        try {

            const result = await Message_Conversation.insertConversation(data);
            console.log(data)
            console.log(result)
            res.status(300).send("Thêm conversation thành công")
        } catch (error) {
            res.send(error)
        }
    }
    async userSentMessage(req, res, next) {
        try {
            const result = await Message_Conversation.findSender(req.params.userID, req.params.userID)
            res.status(200).send(result)
        } catch (error) {
            res.send(error)
        }
    }
    async insertMess(req, res, next) {
        try {
            const data = {
                sender_id: req.body.sender_id,
                conversation_id: req.body.conversation_id,
                content: req.body.content,
            }
           
            const insert = await Message_Conversation.insertMess(data)
            const result={
                id:insert.insertId,
                sender_id: req.body.sender_id,
                conversation_id: req.body.conversation_id,
                content: req.body.content,
                created_at:Date.now()
            }
            res.status(200).send(result)

        }
        catch (err) {
            console.log(err)
        }
    }
    async FindNewestMessFollowConver(req, res, next) {
        try {
            const result = await Message_Conversation.getNewestFromConversation(req.params.conversation_id)
            res.status(200).send(result[0])
        } catch (error) {
            console.log(error)
        }
    }
    async FindMessFollowConver(req, res, next) {
        try {
            const result = await Message_Conversation.FindMessFollowConver(req.params.conversation_id)
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
        }
    }
    async FindNewstMessFollowConverOfSender(req, res, next) {
        const data = [

            req.params.conversation_id,req.params.userID
        ]
        
        try {
            const result = await Message_Conversation.FindNewstMessFollowConverOfSender(data)
            res.status(200).send(result[0])
        } catch (error) {
            console.log(error)
        }
    }
    async SeenMess(req, res, next) {
        const data = {
            conversation_id: req.body.conversation_id,
            sender_id: req.body.sender_id
        }
        try {
            const result = await Message_Conversation.SeenMess(data)

            res.status(200).send(result)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new MessageController()
