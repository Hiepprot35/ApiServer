
const mySqlConnection = require('../models/db.model')
const Student = (studentInfo) => {


}
Student.getAllStudents = () => {
    return new Promise((resolve, reject) => {
        mySqlConnection.connection.query("SELECT * FROM STUDENTS", (err, allStudent) => {
            if (err) {
                reject("Lỗi")
            }
            else
                resolve(allStudent)

        })
    }
    )
}
Student.getAllClassInfomation = () => {
    return new Promise((resolve, reject) => {
        mySqlConnection.connection.query("Select * from Classs", (err, allClass) => {
            if (err) {
                reject("Lỗi")
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
                    reject("Lỗi")
                }
                else
                    resolve(CountStudent)
            })
    }
    )
}
Student.store = (newStudent) => {
    return new Promise((resolve, reject) => {
        mySqlConnection.connection.query("INSERT INTO STUDENTS SET ?", newStudent, (err, result0) => {
            if (err) {
                reject({ message: err })
            }
            else
                resolve({ message: "Thành công" })

        })
    })
}
module.exports = Student

