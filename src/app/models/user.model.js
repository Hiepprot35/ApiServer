// const mongoose=require('mongoose')
// const Schema = mongoose.Schema;
const object = require('../../ulti/object');
const mysql = require('./db.model')
const User = function (user) {
    this.MSSV = user.MSSV;
    this.password = user.password;

}
User.create = function (newUser) {
    return new Promise(function (resolve, reject) {

        mysql.connection.query("Insert into users SET ?", newUser, (err, res) => {
            if (err) {
            }
            else {
                resolve({message:"thành công"})
            }

        }
        )
    }
    );
}
User.findallUser = function () {
    return new Promise(function (resolve, reject) {

        mysql.connection.query('Select * from users', (err, data) => {
            if (err) {
            }
            else {
                resolve(data);
            }

        }
        );
    })
}
User.findId = function (User) {
    return new Promise(function (resolve, reject) {

        mysql.connection.query('Select * from users where MSSV  = ? and password= ? ', [User.MSSV,User.password], (err, result) => {
            
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
}
User.saveChange = function (userInfo,MSSV) {
    return new Promise(function (resolve, reject) {

        mysql.connection.query('update users set ? where SDT =?', [userInfo,MSSV], (err, data) => {
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