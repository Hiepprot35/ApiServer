
const { connect, dbconnection } = require('../models/db.model')
const Student = (studentInfo) => {


}
Student.getAllStudents = () => {
    return new Promise((resolve, reject) => {
        dbconnection.query("SELECT * FROM users", (error, allStudent) => {
            if (error) {
                reject(error)
            }
            else
                resolve(allStudent)

        })
    }
    )
}
Student.getStudentByMSSV=(MSSV)=>
{
    return new Promise((resolve, reject) => {
        dbconnection.query("SELECT * FROM USER WHERE MSSV= ?",[MSSV],(err,result)=>
        {
            if(err)
            {
                reject(err)
            }
            resolve(result)
        })
    })
}
Student.getAllClassInfomation = () => {
    return new Promise((resolve, reject) => {
        dbconnection.query("Select * from Classes", (err, allClass) => {
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

        dbconnection.query("SELECT COUNT(*) FROM students WHERE ClassID LIKE ?", idClass
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
    const hexString = newStudent.img; // Chuỗi hex cần chuyển đổi
    const binaryData = Buffer.from(hexString, 'hex')
     newStudent.img=binaryData
    return new Promise((resolve, reject) => {
        try{

          
 
            
                dbconnection.query("INSERT INTO users SET ?",newStudent, (err, result) => {
                    if (err) {
                        reject({ message: err });
                    } else {
                        resolve({ message: "Thành công" });
                    }
                });
            }
            catch(err)
            {
                console.log(err)
            }
            });
        };
        
Student.findId = (MSSV) => {
    return new Promise((resolve, reject) => {
        dbconnection.query("SELECT * FROM USERS WHERE MSSV= ?", MSSV, (err, result) => {
            if (err) {
                reject(err)

            }
            else
                resolve(result);
        })
    })
}
Student.saveChange = (studentInfo, MSSV) => {
    return new Promise(function (resolve, reject) {

        dbconnection.query('update users set ? where MSSV =?', [studentInfo, MSSV], (err, data) => {
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

