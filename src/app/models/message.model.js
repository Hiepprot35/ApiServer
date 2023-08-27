const { connect, dbconnection } = require('../models/db.model')
const Message_Conversation =  ()=> {


}
Message_Conversation.insertConversation=async (data)=>
{
    console.log("join")
    const insert= await new Promise((resolve, reject) => {
        dbconnection.query("INSERT INTO conversations SET ?",data,(err,result)=>
        {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return insert
}
Message_Conversation.findSender=async(user1,user2)=>{
    const query="Select * from conversations where user1=? or user2=?"
    const userSent=await new Promise((resolve, reject) => {
        dbconnection.query(query,[user1,user2],(err,result)=>
        {
            if(err)
            {
                reject(err)

            }
            else
            {
                resolve(result)
            }
        })
    })
    return userSent
}
Message_Conversation.insertMess=async(data)=>
{
    const query="Insert into messages set ?";
    const insertMess= await new Promise((resolve, reject) => {
        dbconnection.query(query,data,(err,result)=>
        {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return insertMess
}
Message_Conversation.FindMessFollowConver=async (data)=>{
    const query="Select * from messages where conversation_id=?";
    const result= await new Promise((resolve, reject) => {
        dbconnection.query(query,data,(err,result)=>
        {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return result
}
module.exports = Message_Conversation