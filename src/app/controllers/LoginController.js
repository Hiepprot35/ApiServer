
const student = require('../models/user.model')
const jwt = require('jsonwebtoken');

const expiresIn = 3600; // 1 giờ tính bằng giây
require('dotenv').config()
class LoginController {
     async authenticateToken(req, res, next) {
        try {

            var PrivateToken = req.cookies.token;
            var isAdmin = req.cookies.admin;

            var check = jwt.verify(PrivateToken, process.env.ACCESS_TOKEN_SECRET)
            if (check) {
                if (isAdmin == 1) {
                    {
                        const result = await student.findallUser()

                        res.render('home',{data:result});

                    }
                }
                if ( isAdmin != 1) {

                    {
                        res.render('lol')

                    }
                }
            }
            else {
                res.send("Không tồn tại token")
            }

        }
        catch (error) {
            return res.render("login")
        }
    }
    checkLogined(req, res, next) {
        try {

            var PrivateToken = req.cookies.token;
            var isAdmin = req.cookies.admin;
            var check = jwt.verify(PrivateToken, process.env.ACCESS_TOKEN_SECRET)
            if (check) {
              res.redirect('/')
            }
            else {
                next();
            }

        }
        catch (error) {
            res.render("login")
        }
    }
    login(req, res, next) {
        res.render('login')
    }
    async logincheck(req, res, next) {
        const user = {
            Username: req.body.Username,
            password: req.body.password
        }
        const result = await student.findId(user)

        if (result.length == 0) {
            res.send(user)

        }
        else {
            const AccessToken = jwt.sign({ Username: req.body.Username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
            res.cookie('token', AccessToken)
            console.log(result)
            res.cookie('admin', result[0]['isAdmin'])

            if (result[0].isAdmin == 1) {
                        const result = await student.findallUser()

                res.render("home",{data:result })
            }
            if (result[0].isAdmin != 1) {
                res.redirect("/")
            }
            // res.render("lol", { data: result })
            // res.header('Authorization', 'Bearer ' + token).render('home', { data: result });
        }
    }



    logout(req, res, next) {
        try {
            res.clearCookie('token');
            res.redirect("login");
        }
        catch (err) {
            res.redirect("login");
        }


    }
}

module.exports = new LoginController();