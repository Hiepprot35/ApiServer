const { model } = require('mongoose');
const mysql=require('mysql')
const dbConfig=require('../../config/db/data_sever')
const connection=mysql.createConnection(dbConfig)
async function connect()
{
    try
    {
        
        await connection.connect()
        console.log("Success!")

    } catch(err)
    {
        console.log("Error!")
    }

}
module.exports={connect
                ,connection
}