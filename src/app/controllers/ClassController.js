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
        const thongtindangki = {
            "CLASSID": req.body.CLASSID,
            "MSSV": req.body.MSSV,
            "create_at": functionUse.reuturndate()
        }
        try {

            const dangky = await ClassModel.DangKyHoc(thongtindangki)
            console.log(dangky)
            res.status(200)
        } catch (error) {
            res.send(error)

        }
    }
    async LopDaDangKy(req, res, next) {
       
        try {

            const dangky = await ClassModel.LopDaDangKy(req.body.MSSV)
            console.log(dangky)
            res.send(dangky)
        } catch (error) {
            res.send(error)

        }
    }
    async DsacMonTheoKhoa(req,res,next)
    {
        try {
            const danhsachmon = await ClassModel.DsachMonHocTheoKhoa(req.body.MSSV)
            console.log(danhsachmon)
            res.send(danhsachmon)
        } catch (error) {
            
        }
    }
}
module.exports = new ClassController();