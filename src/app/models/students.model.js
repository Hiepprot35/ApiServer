
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

          
 
            
            // const query = `INSERT INTO users (MSSV, Name, Address, Birthday, Sex, Class, img, create_at) VALUES 
            // (${newStudent.MSSV}, ${newStudent.Name}, ${newStudent.Address}, ${escapedBirthday}, ${newStudent.Sex}, 
            //     ${newStudent.Class}, ${newStudent.img}, ${escapedCreateAt})`;
                
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

