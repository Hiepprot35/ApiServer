const express = require('express');
const multer = require('multer');
const upload = multer(); // Tạo một instance của multer
const router=express.Router();
const studentController=require('../app/controllers/StudentController');
const loginController=require('../app/controllers/LoginController');


router.post('/api/login',loginController.loginAPI)
router.post('/api/rfAccessToken',loginController.apiReFreshToken)
router.post('/api/getRefreshToken',loginController.checkRefreshToken)
router.post('/api/getStudentbyID',studentController.getStudentByMSSV)
router.get('/api/profile/:id',studentController.getStudentByMSSV)

router.get('/getallstudent',loginController.authenticateToken,studentController.getAllStudents)
router.post('/api/createStudent',upload.single('image'),studentController.createstudent)
router.get('/api/getAllClass',studentController.getAllClassApi)
router.get('/api/getAllKhoa',studentController.getAllKhoaApi)




module.exports=router;