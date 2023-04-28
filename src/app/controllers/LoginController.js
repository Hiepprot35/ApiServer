const student = require('../models/user.model')
const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';
const expiresIn = 3600; // 1 giờ tính bằng giây

class LoginController {
    authenticateToken(req, res, next) {
        const authHeader = req.headers['Authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.render('login');

        jwt.verify(token, secretKey, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    login(req, res, next) {
        res.send("cawc")
        // res.render('login')
    }
    logincheck(req, res, next) {
        const user={

            MSSV:req.body.MSSV,
            password:req.body.password
        }
        student.findId(user)
            .then(function (result) {
                if (result.length === 0) { // Nếu không tìm thấy user
                    res.send( { message: 'Tên đăng nhập không tồn tại.' }); // Trả về trang đăng nhập với thông báo
                } else {

                    const token = jwt.sign({ MSSV: req.body.MSSV }, secretKey, { expiresIn });
                    res.header('Authorization',  token);
                    res.send(
                        
                        {
                            user,
                        "token" :token
                });

                    // res.header('Authorization', 'Bearer ' + token).render('home', { data: result });



                }
            }
            )
            .catch(function (error) {
                res.send("Looix")
                // console.log(error);
                // res.render('login', { message: 'Có lỗi xảy ra, vui lòng thử lại.' }); // Trả về trang đăng nhập với thông báo
            });

    }
}
module.exports = new LoginController();