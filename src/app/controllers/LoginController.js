
const { user } = require('../../config/db/data_sever');
const student = require('../models/user.model')
const jwt = require('jsonwebtoken');
const Buffer = require('buffer').Buffer;
const TimeAccessToken = "5m"
const TimeRefreshToken = "1d"
require('dotenv').config()

class LoginController {
    async authenticateToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token === null) return res.status(403).json({ error: true, message: "Không tồn tại token" });
            ;

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(401).json({ error: true, message: "Token đã hết hạn" });

                else {
                    res.status(200)
                    next()
                }

            })


        }
        catch (error) {
            res.send(error)
        }
    }
    async test(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token === null) return res.status(403).json({ error: true, message: "Không tồn tại token" });
            ;

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(401).json({ error: true, message: "Token đã hết hạn" });

                else {
                    res.status(200).json({ message: "Ok" })
                }

            })


        }
        catch (error) {
            res.send(error)
        }
    }
    async loginAPI(req, res, next) {
        const user = {
            MSSV: req.body.MSSV,
            password: req.body.password
        };

        try {
            const result = await student.findId(user);
            if (result.length === 0) {
                return res.status(401).json({ error: true, message: "Không tìm thấy tài khoản hoặc mật khẩu không đúng." });
            }

            const AccessToken = jwt.sign({ MSSV: result.MSSV }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: TimeAccessToken });
            const RefreshToken = jwt.sign({ MSSV: result.MSSV }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: TimeRefreshToken });
            res.cookie("tokenRefresh", RefreshToken);
            res.send({ "user": result, "AccessToken": AccessToken, "expiresIn": TimeAccessToken });

        } catch (error) {
            console.error(error);
            res.send(error)
        }
    }
    async apiReFreshToken(req, res, next) {
        const TokenRF = req.cookies.tokenRefresh;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!TokenRF) {
            res.status(403)
        }
        else {

            jwt.verify(TokenRF, process.env.REFRESH_TOKEN_SECRET, (err, user1) => {
                if (err) return res.status(403)
                else {
                    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                        if (err) {
                            const AccessToken2 = jwt.sign({ MSSV: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: TimeAccessToken });
                            res.status(401).send({ "AccessToken": AccessToken2, "expiresIn": TimeAccessToken })
                        }
                        else
                        {
                            res.status(200).json("Token thỏa mãn")
                        }
                    })

                }
            })

        }

    }
    checkLogined(req, res, next) {
        try {

            const PrivateToken = req.cookies.token;
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
            res.render('login', { message: "Sai tài khoản hoặc mật khẩu" })

        }
        else {
            const AccessToken = jwt.sign({ Username: req.body.Username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
            res.cookie('token', AccessToken)
            console.log(res.cookie)
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