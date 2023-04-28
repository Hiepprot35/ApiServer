const student = require('../models/user.model')

class NewsController {
    index(req, res, next) {

        student.findallUser()
            .then(function (result) {

                res.send(result)
                // res.render('lol', { data: result })
            })






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
    store(req, res, next) {
        var new_student = {
            MSSV: req.body.MSSV,
            name: req.body.name,
            address: req.body.address,
            sex: req.body.sex,

        }
      
                student.create(new_student)
                .then(function(){  
                })
            
        
        



    }
  
    findid(req, res, next) {
        student.findId(req.params.id)
            .then(function (result) {
                res.render('courses/change', { data: result })
                // console.log(req.params.id)
            }
            )


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