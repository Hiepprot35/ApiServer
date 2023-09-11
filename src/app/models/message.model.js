const { connect, dbconnection } = require('../models/db.model')
const Message_Conversation = () => {


}
Message_Conversation.insertConversation = async (data) => {
    console.log("join")
    const insert = await new Promise((resolve, reject) => {
        dbconnection.query("INSERT INTO conversations SET ?", data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return insert
}
Message_Conversation.findSender = async (user1, user2) => {
    // const query="Select * from conversations where user1=? or user2=?"
    const query = `
    SELECT 
    MAX(d.isSeen) AS isSeen,
     MAX(d.sender_id) AS sender_id,
     d.user1, d.user2,
     MAX(d.content) AS content, d.id,
     MAX(d.created_at) AS created_at
 FROM (
     SELECT
         m.sender_id,
         m.isSeen,
         c.user1, c.user2,
         m.content, m.conversation_id AS id,
         m.created_at
     FROM messages m 
     JOIN (
         SELECT  
             conversation_id,
             MAX(created_at) AS max_created_at
         FROM messages
         GROUP BY conversation_id 
     ) AS latest_msg
     ON m.conversation_id = latest_msg.conversation_id AND m.created_at = latest_msg.max_created_at 
     INNER JOIN (
         SELECT c.user1, c.user2, c.id 
         FROM conversations c 
         WHERE c.user1 = 27 OR c.user2 = 27
     ) AS c ON c.id = m.conversation_id 
 ) AS d GROUP BY d.id, d.user1, d.user2
 ORDER BY created_at DESC;
  `

    const userSent = await new Promise((resolve, reject) => {
        dbconnection.query(query, [user1, user2], (err, result) => {
            if (err) {
                reject(err)

            }
            else {
                resolve(result)
            }
        })
    })
    return userSent
}
Message_Conversation.getNewestFromConversation = async (data) => {
    const query = `SELECT m.id,m.sender_id,m.content, m.conversation_id, m.created_at 
    FROM messages AS m 
    INNER JOIN 
    (SELECT conversation_id, MAX(created_at) AS max_created_at 
    FROM messages GROUP BY conversation_id) AS subquery ON m.conversation_id = subquery.conversation_id AND m.created_at = subquery.max_created_at WHERE m.conversation_id=?;`;

    const result = await new Promise((resolve, reject) => {
        dbconnection.query(query, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return result
}
Message_Conversation.insertMess = async (data) => {
    const query = "Insert into messages set ?";
    const insertMess = await new Promise((resolve, reject) => {
        dbconnection.query(query, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return insertMess
}
Message_Conversation.FindMessFollowConver = async (data) => {
    const query = "Select * from messages where conversation_id=?";
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(query, [data], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return result
}
Message_Conversation.LastMessSeen = async (data) => {
    const query = "Select id,content,sender_is,max(Seen_at) from messages where isSeen=true and conversation_id=?";
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(query, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return result
}
Message_Conversation.SeenMess = async (data) => {
    const query = `UPDATE messages
    SET isSeen = true
    WHERE created_at = (
        SELECT MAX(created_at)
        FROM (
            SELECT created_at
            FROM messages
            WHERE conversation_id = ? AND sender_id = ? AND isSeen = false
        ) AS subquery
    );
    `;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(query, [data.conversation_id, data.sender_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return result
}
Message_Conversation.HaveSeenMesssage = async (data) => {
    const query = "Select isSeen from messages where id=?";
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(query, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return result
}
Message_Conversation.FindNewstMessFollowConverOfSender = async (data) => {
    const query = `SELECT m1.id, m1.sender_id, m1.conversation_id, m1.content, m1.created_at, m1.isSeen, m1.Seen_at
    FROM messages m1
    WHERE m1.conversation_id = ? and m1.sender_id= ?
        AND m1.isSeen = true
        AND m1.created_at = (
            SELECT MAX(created_at)
            FROM messages m2
            WHERE m2.sender_id = m1.sender_id
                AND m2.conversation_id = m1.conversation_id);
    `;
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(query, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return result
}
Message_Conversation.FindConverFollowUserguest = async (data) => {
    const query = `select * from conversations where (user2=? and user1=?) or (user1=? and user2=?)`
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(query, [data.user1, data.user2, data.user1, data.user2], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    return result
}
Message_Conversation.FindUserSendToAuth = async (data) => {
    const query = `SELECT username.username
    FROM (
        SELECT DISTINCT user1 AS user
        FROM conversations
        WHERE user2 = ?
        UNION
        SELECT DISTINCT user2 AS user
        FROM conversations
        WHERE user1 = ?
    ) AS c
    INNER JOIN username ON username.UserID = c.user;
    `
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(query, [data.user1, data.user2, data.user1, data.user2], (err, result) => {
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