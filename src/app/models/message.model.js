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
Message_Conversation.getNewestFromConversation=async(data)=>
{
    const query=`SELECT m.id,m.sender_id,m.content, m.conversation_id, m.created_at 
    FROM messages AS m 
    INNER JOIN 
    (SELECT conversation_id, MAX(created_at) AS max_created_at 
    FROM messages GROUP BY conversation_id) AS subquery ON m.conversation_id = subquery.conversation_id AND m.created_at = subquery.max_created_at WHERE m.conversation_id=?;`;

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