const { model } = require('mongoose');
const mysql=require('mysql')
require('dotenv').config()
const dbconnection=mysql.createConnection(
    {
        host: process.env.DB_host,
        user: process.env.DB_user,
        password:"",
        database: process.env.DB_database
    }
)
console.log(process.env.DB_host)

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