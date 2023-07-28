const { model } = require('mongoose');
const mysql=require('mysql')
const dbConfig=require('../../config/db/data_sever')
const dbconnection=mysql.createConnection(dbConfig)
async function connect()
{
    try
    {
        
        await dbconnection.connect()
        console.log("Success!")

    } catch(err)
    {
        console.log("Error!")
    }

}
module.exports={connect
                ,dbconnection
}