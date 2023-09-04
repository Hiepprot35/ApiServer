const express = require('express');
const multer = require('multer');
const upload = multer(); // Tạo một instance của multer
const router=express.Router();
const studentController=require('../app/controllers/StudentController');
const loginController=require('../app/controllers/LoginController');
const classController=require('../app/controllers/ClassController')
const messageController=require('../app/controllers/MessageController');
const sendGmaiController= require('../app//controllers/sendGmailController');
router.post('/login',loginController.loginAPI)
router.post('/rfAccessToken',loginController.apiReFreshToken)
router.post('/getRefreshToken',loginController.checkRefreshToken)
router.get('/getStudentbyID/:mssv',studentController.getStudentByMSSV)
router.get('/username',loginController.findUsernameID)
router.get('/userID/:username',loginController.findUsername)

router.get('/getallstudent',loginController.authenticateToken,studentController.getAllStudents)
router.post('/createStudent',upload.single('image'),studentController.createstudent)
router.get('/getAllClass',studentController.getAllClassApi)
router.get('/getAllKhoa',studentController.getAllKhoaApi)

router.post('/getClassMonHoc',classController.getClassMonHoc)
router.get('/getMonHoc',classController.getAllMonHoc)
router.post('/dangkihoc',classController.DangKyLopHoc)
router.post('/lopdadangky',classController.LopDaDangKy)
router.post('/danhsachmontheokhoa',classController.DsacMonTheoKhoa)


router.post('/send-email',sendGmaiController.sendGmail)

router.post('/conversations',messageController.insertConVersation)
router.post('/conversations/mess/:id',messageController.FindConverFollowUserguest)
router.post('/findusersend',messageController.FindUserSendToAuth)

router.get('/conversations/:userID',messageController.userSentMessage)



module.exports=router;