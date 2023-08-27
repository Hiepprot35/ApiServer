const Message_Conversation = require('../models/message.model')
class MessageController {
    async insertConVersation(req, res, next) {
        const data = {
            user1: req.body.user1,
            user2: req.body.user2
        }
        try {

            const result = await Message_Conversation.insertConversation(data);
            console.log(data)
            console.log(result)
            res.status(300).send("oke")
        } catch (error) {
            res.send(error)
        }
    }
    async userSentMessage(req, res, next) {
        try {
            const result = await Message_Conversation.findSender(req.params.userID,req.params.userID)
            res.status(200).send(result)
        } catch (error) {
            res.send(error)
        }
    }
    async insertMess(req, res, next) {
        try {
            const data={
                sender_id:req.body.sender_id,
                conversation_id :req.body.conversation_id,
                content:req.body.content
            }
            const insert = await Message_Conversation.insertMess(data)
            res.status(200).send(data)

        }
        catch(err)
        {
            console.log(err)
        }
    }
    async FindMessFollowConver(req,res,next)
    {
        try {
            const result =await Message_Conversation.FindMessFollowConver(req.params.conversation_id)
            res.status(200).send(result)
        } catch (error) {
            res.status(404)
        }
    }
}
module.exports = new MessageController()
