// const mongoose=require('mongoose')
// const Schema = mongoose.Schema;
const object = require('../../ulti/object');
const {connect,dbconnection} = require('./db.model')
const User = function (user) {
    this.MSSV = user.MSSV;
    this.password = user.password;

}
User.create = function (newUser) {
    return new Promise(function (resolve, reject) {

        dbconnection.query("Insert into username SET ?", newUser, (err, res) => {
            if (err) {
                reject(err)
            }
            else {
                resolve({message:"thành công"})
            }

        }
        )
    }
    );
}
User.findUsernameID = function (usernameID) {
    return new Promise(function (resolve, reject) {

        dbconnection.query('Select * from username where UserID=?',[usernameID], (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }

        }
        );
    })
}
User.findUsername=async function(userID)
{
    return new Promise(function (resolve, reject) {

        dbconnection.query('Select * from username where username=?',[userID], (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }

        }
        );
    })
}
User.findId = async function (User) {
    const userInfo=await new Promise(function (resolve, reject) {

        dbconnection.query('Select * from username where username  = ? and password= ? ', [User.MSSV,User.password], (err, result) => {
            
            if (result)
            {
                
                
                resolve(result)
            } 
            else
            {

                reject(err)
            }
        }
        )
    })
    return userInfo[0]
}
User.getRFToken= async function(MSSV)
{
    const RFToken= await new Promise((resolve, reject) => {
        dbconnection.query('select RefreshToken from users where MSSV=?',[MSSV],(err,token)=>
        {
            if(err) return reject(err)
            else
        {

            resolve(token)
        }
        })
        return RFToken[0]
    })
}
User.saveChange = function (userInfo,MSSV) {
    return new Promise(function (resolve, reject) {

        dbconnection.query('update users set ? where SDT =?', [userInfo,MSSV], (err, data) => {
            if (err) return reject(err)
            else {
                resolve(data);
            }

        }
        );
    }
    )
}
// const data_hiep = new mysql({
//     name:{type:String},
//     MSSV:{type:String},
//     img:{type:String},


// },
// {  timestamps:true,
// versionKey: false },


// );
// module.exports = mysql.model('data_hiep', data_hiep);


module.exports = User