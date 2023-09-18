const { connect, dbconnection } = require('../models/db.model')
const ClassModel = (studentInfo) => {


}
ClassModel.getAllClassMonHoc = async (MaMonHoc) => {
    const query = `
    SELECT 
    lophoctheomon.CLASSID, 
    monhoc.MonHocTen, 
    lophoctheomon.SiSo, 
    IFNULL(danhsach.TongSo, 0) AS TongSo, 
    ki_hoc.TenKiHoc,
    ca_hoc.CaID,
    ca_hoc.ThuTrongTuan,
    ca_hoc.ThoiGianBatDau, 
    ca_hoc.ThoiGianKetThuc
FROM lophoctheomon
INNER JOIN monhoc ON lophoctheomon.MonHocID = monhoc.MonHocID
INNER JOIN ki_hoc ON lophoctheomon.KiHocID = ki_hoc.KiHocID
INNER JOIN cahoc_lophoc ON cahoc_lophoc.CLASSID = lophoctheomon.CLASSID
INNER JOIN ca_hoc ON cahoc_lophoc.CaID = ca_hoc.CaID
LEFT JOIN (
    SELECT CLASSID, COUNT(CLASSID) AS TongSo
    FROM chitietlophoc
    GROUP BY CLASSID
) AS danhsach ON danhsach.CLASSID = lophoctheomon.CLASSID
WHERE monhoc.MonHocID = ?;
    `
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
ClassModel.getListKiHoc = async () => {
    const query = 'Select * from ki_hoc'
    const kiHoc = await new Promise((resolve, reject) => {
        dbconnection.query(query, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return kiHoc

}
ClassModel.getLichHocSV = async (data) => {
    const query = `SELECT chitietlophoc.CLASSID,lophoctheomon.KiHocID,lophoctheomon.MonHocID,cahoc_lophoc.CaID,ca_hoc.ThoiGianBatDau,ca_hoc.ThoiGianKetThuc,ca_hoc.ThuTrongTuan from chitietlophoc 
    inner join lophoctheomon on lophoctheomon.CLASSID=chitietlophoc.CLASSID 
    INNER join cahoc_lophoc on cahoc_lophoc.CLASSID=chitietlophoc.CLASSID 
    inner join ca_hoc on cahoc_lophoc.CaID=ca_hoc.CaID where chitietlophoc.MSSV= ? and lophoctheomon.KiHocID= ? 
    ORDER BY ca_hoc.ThoiGianBatDau ASC`
    const result = await new Promise((resolve, reject) => {
        dbconnection.query(query, [data.MSSV, data.KiHocID], (err, result) => {
            if (err) {
                reject(err)
            }
            else {

                resolve(result)
            }
        })
    })
    return result
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
ClassModel.DangKyHoc = (data) => {
    const info = {
        "CLASSID": data.CLASSID,
        "MSSV": data.MSSV,
        "create_at": data.create_at
    }
    const query = "Insert into chitietlophoc set ?";
    return new Promise((resolve, reject) => {
        try {
            dbconnection.query(query, info, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    console.log("da dang ki")
                    resolve(data)
                }
            })
        } catch (error) {
            console.log(error)
        }

    })
}
ClassModel.XoalopDangki = async (data) => {
    const query = "delete from chitietlophoc where CLASSID =? and MSSV=?";
    const Dsachmon = await new Promise((resolve, reject) => {
        try {
            dbconnection.query(query, [data.CLASSID, data.MSSV], (error, result) => {
                if (error) {
                    reject(error)
                }
                else {
                    console.log("đã xoá")
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
    return Dsachmon
}
ClassModel.LopDaDangKy = async (MSSV) => {
    const query = "SELECT chitietlophoc.CLASSID,lophoctheomon.MonHocID FROM `chitietlophoc`inner join lophoctheomon on chitietlophoc.CLASSID=lophoctheomon.CLASSID where chitietlophoc.MSSV= ?";
    const Dsachlop = await new Promise((resolve, reject) => {
        try {
            dbconnection.query(query, [MSSV], (error, result) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
    return Dsachlop
}
ClassModel.DsachMonHocTheoKhoa = async (MSSV) => {
    const query = "select monhoc.MonHocID, monhoc.MonHocTen,monhoc.TinChi,khoa.KhoaName,khoa.KhoaID from monhoc JOIN chitietmonhoc on monhoc.MonHocID = chitietmonhoc.MonHocID JOIN khoa on khoa.KhoaID= chitietmonhoc.KhoaID join users on users.Khoa=khoa.KhoaID where users.MSSV= ?";
    const Dsachmon = await new Promise((resolve, reject) => {
        try {
            dbconnection.query(query, [MSSV], (error, result) => {
                if (error) {
                    reject(error)
                }
                else {
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
