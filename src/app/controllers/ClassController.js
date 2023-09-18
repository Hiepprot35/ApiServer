const ClassModel = require('../models/class.model')
const functionUse = require('./function/returndate');

class ClassController {
    async getClassMonHoc(req, res, next) {
        try {
            const classes = await ClassModel.getAllClassMonHoc(req.body.MaMonHoc);
            res.send(classes)
        } catch (error) {
            res.send(error)
        }

    }
    async getAllMonHoc(req, res, next) {
        try {
            const monhoc = await ClassModel.getAllMonHoc();
            res.send(monhoc)
        } catch (error) {
            res.send(error)
        }

    }
    async DangKyLopHoc(req, res, next) {
        const DaDangKy = await ClassModel.LopDaDangKy(req.body.MSSV)
        
        const thongtindangki = {
            "CLASSID": req.body.CLASSID,
            "MSSV": req.body.MSSV,
            "MonHocID":req.body.MaMonHoc,
            "create_at": functionUse.reuturndate()
        }
        console.log(thongtindangki)
        try {
                const isClassRegistered = DaDangKy.some(e => e.CLASSID === parseInt(req.body.CLASSID));

                if (isClassRegistered) {
                    // Nếu lớp đã được đăng ký, thực hiện xóa
                    const xoa = await ClassModel.XoalopDangki(thongtindangki);
                    res.status(200).json("Xoa lop");
                } else {
                    // Nếu lớp chưa được đăng ký, thực hiện đăng ký
                    const dangki = await ClassModel.DangKyHoc(thongtindangki);
                    res.status(201).send(dangki);
                }
            } catch (error) {
                res.send(error)

            }
        }
    async LopDaDangKy(req, res, next) {

            try {

                const dangky = await ClassModel.LopDaDangKy(req.body.MSSV)

                res.send(dangky)
            } catch (error) {
                res.send(error)

            }
        }
    async DsacMonTheoKhoa(req, res, next)
        {
            try {
                const danhsachmon = await ClassModel.DsachMonHocTheoKhoa(req.body.MSSV)
                console.log(danhsachmon)
                res.send(danhsachmon)
            } catch (error) {

            }
        }
        async ListKihoc(req,res,next)
        {
            try {
              const listKiHoc=await ClassModel.getListKiHoc()
              res.send(listKiHoc)  
            } catch (error) {
                console.log(error)
            }
        }
        async getLichHoc(req,res,next)
        {
            const data={
                "MSSV":req.body.MSSV,
                "KiHocID":req.body.KiHocID
            }
            try {
                const getLichHoc=await ClassModel.getLichHocSV(data)
                res.send(getLichHoc)  
            } catch (error) {
                res.send(error)
                
            }
        }
    }
module.exports = new ClassController();