const { connect, dbconnection } = require('../models/db.model')
const ClassModel = (studentInfo) => {


}
ClassModel.getAllClassMonHoc = async (MaMonHoc) => {
    const query = "Select lophoctheomon.CLASSID,monhoc.MonHocTen,lophoctheomon.SiSo from lophoctheomon join monhoc on lophoctheomon.MonHocID=monhoc.MonHocID where monhoc.MonHocID=?"
    const classes = await new Promise((resolve, reject) => {
        dbconnection.query(query, [MaMonHoc], (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    }
    )
    return classes
}
ClassModel.getAllMonHoc = async () => {
    const query = "Select * from monhoc"
    const monhoc = await new Promise((resolve, reject) => {
        dbconnection.query(query, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    }
    )
    return monhoc
}
ClassModel.DangKyHoc =  (data) => {
    console.log("cac")
    const query="Insert into chitietlophoc set ?";
    return new Promise((resolve, reject) => {
        try {
            dbconnection.query("Insert into chitietlophoc set ?", data,(err,result)=>
            {
                if(err)
                {
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
        }
      
    })
}
module.exports = ClassModel
