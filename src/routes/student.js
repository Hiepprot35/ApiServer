const express = require('express');
const multer = require('multer');
const upload = multer(); // Tạo một instance của multer
const router=express.Router();
const studentController=require('../app/controllers/StudentController');
const loginController=require('../app/controllers/LoginController');
const classController=require('../app/controllers/ClassController')
const messageController=require('../app/controllers/MessageController');
const LoginController = require('../app/controllers/LoginController');
router.post('/api/login',loginController.loginAPI)
router.post('/api/rfAccessToken',loginController.apiReFreshToken)
router.post('/api/getRefreshToken',loginController.checkRefreshToken)
router.post('/api/getStudentbyID',studentController.getStudentByMSSV)
router.get('/api/username',loginController.findUsernameID)

router.get('/getallstudent',loginController.authenticateToken,studentController.getAllStudents)
router.post('/api/createStudent',upload.single('image'),studentController.createstudent)
router.get('/api/getAllClass',studentController.getAllClassApi)
router.get('/api/getAllKhoa',studentController.getAllKhoaApi)

router.post('/api/getClassMonHoc',classController.getClassMonHoc)
router.get('/api/getMonHoc',classController.getAllMonHoc)
router.post('/api/dangkihoc',classController.DangKyLopHoc)
router.post('/api/lopdadangky',classController.LopDaDangKy)
router.post('/api/danhsachmontheokhoa',classController.DsacMonTheoKhoa)



router.post('/api/conversations',messageController.insertConVersation)
router.get('/api/conversations/:userID',messageController.userSentMessage)
router.post('/api/message',messageController.insertMess)
router.get('/api/message/:conversation_id',messageController.FindMessFollowConver)


module.exports=router;