
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
Student.findUserSearchBar=(data)=>{
    const query=`select users.MSSV,username.UserID from users inner join username on users.MSSV=username.username  where users.Name like ?`;
    const searchTerm = `%${data}%`; // Thêm dấu % ở đây để tạo thành một chuỗi tìm kiếm hợp lệ.

    return new Promise((resolve,reject)=>{
        dbconnection.query(query,searchTerm,(error,result)=>{
            if(error)
            {
                reject(error)
            }
            else
            resolve(result)
        })
    })
}
Student.getStudentByMSSV = async (MSSV) => {
    const data = await new Promise((resolve, reject) => {
        dbconnection.query("SELECT * FROM users WHERE MSSV = ?", [MSSV], (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
    return data[0]
}
Student.getAllClassInfomation = () => {
    return new Promise((resolve, reject) => {
        dbconnection.query("Select * from classes", (err, allClass) => {
            if (err) {
                reject(err)
            }
            else
                resolve(allClass)
        })
    }
    )
}
Student.getAllKhoaInfomation = () => {
    return new Promise((resolve, reject) => {
        dbconnection.query("Select * from khoa", (err, allKhoa) => {
            if (err) {
                reject(err)
            }
            else
                resolve(allKhoa)
        })
    }
    )
}
Student.getCountClass = async (idClass) => {
    try {
        const CountStudent = await new Promise((resolve, reject) => {
            dbconnection.query("SELECT COUNT(*) FROM users WHERE Class LIKE ?", idClass, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return CountStudent[0]['COUNT(*)'];
    } catch (error) {
        throw error;
    }
};
Student.store = (newStudent) => {
    const hexString = newStudent.img; // Chuỗi hex cần chuyển đổi
    const hexString2 = newStudent.backgroundimg; // Chuỗi hex cần chuyển đổi

    const binaryData = Buffer.from(hexString, 'hex')
    const binaryData2 = Buffer.from(hexString2, 'hex')

    newStudent.img = binaryData
    newStudent.backgroundimg=binaryData2
    return new Promise((resolve, reject) => {
        try {




            dbconnection.query("INSERT INTO users SET ?", newStudent, (err, result) => {
                if (err) {
                    reject({ message: err });
                } else {
                    resolve(result);
                }
            });
        }
        catch (err) {
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

