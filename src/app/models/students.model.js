
const mySqlConnection = require('../models/db.model')
const Student = (studentInfo) => {


}
Student.getAllStudents = () => {
    return new Promise((resolve, reject) => {
        mySqlConnection.connection.query("SELECT * FROM users", (error, allStudent) => {
            if (error) {
                reject(error)
            }
            else
                resolve(allStudent)

        })
    }
    )
}
Student.getAllClassInfomation = () => {
    return new Promise((resolve, reject) => {
        mySqlConnection.connection.query("Select * from Classes", (err, allClass) => {
            if (err) {
                reject(err)
            }
            else
                resolve(allClass)
        })
    }
    )
}
Student.getCountClass = (idClass) => {
    return new Promise((resolve, reject) => {
        
        mySqlConnection.connection.query("SELECT COUNT(*) FROM students WHERE ClassID LIKE ?", idClass
            , (err, CountStudent) => {
                if (err) {
                    reject(err)
                }
                else
                    resolve(CountStudent)
            })
    }
    )
}
Student.store = (newStudent) => {
    return new Promise((resolve, reject) => {
        mySqlConnection.connection.query("INSERT INTO users SET ?", newStudent, (err, result) => {
            if (err) {
                reject({ message: err })
            }
            else
                resolve({ message: "Thành công" })

        })
    })
}
 Student.findId= (MSSV)=>
{
    return new Promise((resolve,reject)=>
    {
        mySqlConnection.connection.query("SELECT * FROM USERS WHERE MSSV= ?",MSSV,(err,result)=>{
            if(err){
                reject(err)

            }
            else 
            resolve(result);
        })
    })
}
Student.saveChange=(studentInfo,MSSV)=>
{
    return new Promise(function (resolve, reject) {

        mySqlConnection.connection.query('update users set ? where MSSV =?', [studentInfo,MSSV], (err, data) => {
            if (err) return reject(err)
            else {
                resolve(data);
            }

        }
        );
    }
    )
}
module.exports = Student

