const student = require('../models/students.model')
const functionUse = require('./function/returndate')
class NewsController {
    async getAllStudents(req, res, next) {

        const AllStudent = await student.getAllStudents()
        if (AllStudent) {
            res.json(AllStudent)
        }
        else {
            res.json("Fail")
        }
    }
    async createstudent(req, res, next) {
        var d = new Date();
        var id = d.getTime();
        const returnID= await student.getCountClass(req.body.ClassID);
        console.log(returnID)
        var new_student = {
            ID: functionUse.reuturnID(req.body.ClassID,returnID[0]['COUNT(*)']),
            Email: req.body.Email,
            SDT: req.body.SDT,
            NameStudent: req.body.NameStudent,
            ClassID: req.body.ClassID,
            BirthDate: req.body.BirthDate,
            Sexual: req.body.Sexual,
            creat_at: functionUse.reuturndate(id)

        }
      
        try {
            const studentcreate = await student.store(new_student)
            res.status(200).send("Thành công")
        } catch (error) {
            res.status(400).send("Thất bại")
            console.log(error)
        }





    }
    async createView(req, res, next) {
        try {


            const getAllClass = await student.getAllClassInfomation();
            res.render('courses/create',{classData:getAllClass})

        }
        catch
        {
            console.log("Lỗi")
        }

        //     res.render('courses/create',{classData:getAllClass})

    }
    index(req, res, next) {
        res.render('lol')
    }
    // index(req, res,next) {
    //     data_hiep.query(sql, function (error, all_users) {
    //         if (error) throw error;

    //         else
    //         res.render('home',{data: all_users});

    //     })
    create(req, res, next) {

        student.findallUser()
            .then(function (result) {

                res.render('courses/create', { data: result })
            })
    }
    async store(req, res, next) {
        var new_student = {
            MSSV: req.body.MSSV,
            name: req.body.name,
            address: req.body.address,
            sex: req.body.sex,
            password: req.body.password,

        }

        const message = await student.create(new_student)
        res.redirect("/dangky", { message: "thành công" })
    }

    async findid(req, res, next) {
        try {

            const result = await student.findId(req.params.id)
            res.render('courses/change', { data: result })

        }
        catch (error) {
            res.render("/")
        }



    }
    async change(req, res, next) {
        try {
            const new_student = {
                MSSV: req.body.MSSV,
                name: req.body.name,
                address: req.body.address,
                sex: req.body.sex,
            };

            await student.saveChange(new_student, req.body.MSSV);

            const result = await student.findallUser();
            res.render('home', { data: result });
        } catch (error) {
            next(error);
        }
    }


}

module.exports = new NewsController();