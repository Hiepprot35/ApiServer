
const student = require('../models/user.model')
const jwt = require('jsonwebtoken');
const Buffer = require('buffer').Buffer;

const expiresIn = 10; // 1 giờ tính bằng giây
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
                        next();
                    }
                }
                if (isAdmin != 1) {
                    {
                        next();
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
    async loginAPI(req,res,next)
    {
        const user = {
            MSSV: req.body.MSSV,
            password: req.body.password
        }
        const result = await student.findId(user)
        if (result.length == 0) {
            res.json('Sai tai khoan hoac mat khau')

        }
        else {
            const AccessToken = jwt.sign({ Username: req.body.Username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });

            res.send({"user":user,"token":AccessToken})


        }
    }
    checkLogined(req, res, next) {
        try {

            const PrivateToken = req.cookies.token;
            const isAdmin = req.cookies.admin;
            const check = jwt.verify(PrivateToken, process.env.ACCESS_TOKEN_SECRET)
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
            res.render('login', { message :"Sai tài khoản hoặc mật khẩu"} )

        }
        else {
            const AccessToken = jwt.sign({ Username: req.body.Username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
            res.cookie('token', AccessToken)

            res.redirect("/")


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