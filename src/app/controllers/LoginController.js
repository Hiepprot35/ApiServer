
const { user } = require('../../config/db/data_sever');
const { use } = require('../../routes/student');
const student = require('../models/user.model')

const jwt = require('jsonwebtoken');
const Buffer = require('buffer').Buffer;
const TimeAccessToken = "10m"
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
    async checkRefreshToken(req, res, next) {
        try {
            const RefreshToken = req.body.RefreshToken;
            if (!RefreshToken) {
                return res.status(401).json("Chưa đăng nhập")
            }
            else {
                jwt.verify(RefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) return res.status(403).json("Token không được xác thực")

                    else {
                        return res.status(200).json("OK")
                    }
                }
                )
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    async findUsername(req,res,next)
    {
        try {
            const username=await student.findUsername(req.params.username)
            res.status(200).send(username)

        }
        catch (error) {
            res.send(error)
        }
    }
    async findUsernameID(req, res, next) {
        try {
            const username=await student.findUsernameID(req.query.id)
            res.status(200).send(username)

        }
        catch (error) {
            res.send(error)
        }
    }
    async loginAPI(req, res, next) {
        const user = {
            MSSV: req.body.username,
            password: req.body.password
        };

        try {
            const result = await student.findId(user);
            if (!result) {
                return res.status(401).json({ error: true, message: "Không tìm thấy tài khoản hoặc mật khẩu không đúng." });
            }

            else {
                let id = result.RoleID
                const AccessToken = jwt.sign({ UserID: result.UserID,Username:result.username, Role: result.RoleID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: TimeAccessToken });
                const RefreshToken = jwt.sign({ UserID: result.UserID,Username:result.username, Role: result.RoleID }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: TimeRefreshToken });
                res.cookie("RefreshToken", RefreshToken)
                res.status(200).send({ "UserID": result.UserID,"Username":result.username, "Role": result.RoleID, "AccessToken": AccessToken, "expiresIn": TimeAccessToken, "RefreshToken": RefreshToken });

            }
        } catch (error) {
            console.error(error);
            res.send(error)
        }
    }
    async apiReFreshToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const rf = req.headers['refreshtoken'];

        const RefreshToken =  req.body;
        // console.log("body",RefreshToken)
        // console.log("header",rf)
        if (!RefreshToken) {
            res.status(401).json("đmm")
        }
        else {

            jwt.verify(rf, process.env.REFRESH_TOKEN_SECRET, async (err, user1) => {
                if (err) return res.status(402)
                else {

                    
                    // const result =await 
                    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                        if (err) {
                            const AccessToken2 = jwt.sign({"UserID":user1.UserID,"Username":user1.Username,"Role":user1.Role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: TimeAccessToken });
                            res.status(200).send({"UserID":user1.UserID,"Username":user1.Username,"Role":user1.Role,"AccessToken": AccessToken2, "expiresIn": TimeAccessToken })
                        }
                        else {
                            res.status(200).send({"UserID":user.UserID,"Username":user1.Username,"Role":user.Role,"AccessToken": token, "expiresIn": TimeAccessToken })
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