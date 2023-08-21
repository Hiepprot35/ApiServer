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
ClassModel.LopDaDangKy= async (MSSV)=>
{
    const query="SELECT chitietlophoc.CLASSID from chitietlophoc where MSSV= ?";
    const Dsachlop= await new Promise((resolve, reject) => {
        try {
            dbconnection.query(query, [MSSV],(error,result)=>{
                if(error)
                {
                    reject(error)
                }
                else{
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
    return Dsachlop
}
ClassModel.DsachMonHocTheoKhoa=async(MSSV)=>
{
    const query="select monhoc.MonHocID, monhoc.MonHocTen,monhoc.TinChi,khoa.KhoaName,khoa.KhoaID from monhoc JOIN chitietmonhoc on monhoc.MonHocID = chitietmonhoc.MonHocID JOIN khoa on khoa.KhoaID= chitietmonhoc.KhoaID join users on users.Khoa=khoa.KhoaID where users.MSSV= ?";
    const Dsachmon= await new Promise((resolve, reject) => {
        try {
            dbconnection.query(query, [MSSV],(error,result)=>{
                if(error)
                {
                    reject(error)
                }
                else{
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
    return Dsachmon
}
module.exports = ClassModel
