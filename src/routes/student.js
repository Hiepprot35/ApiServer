const express = require('express');
const router=express.Router();
const studentController=require('../app/controllers/StudentController');
const loginController=require('../app/controllers/LoginController');


router.get('api/dangky',studentController.createView);
router.post('/store',studentController.createstudent);

router.get('/api/login',loginController.checkLogined,loginController.login)
router.post('/api/login',loginController.logincheck)
router.get('api/logout',loginController.logout)

router.get('/api/getallstudents',studentController.getAllStudents)
router.post('api/createstudent',studentController.createstudent)

// router.get('/change/profile/MSSV=:id',studentController.findid);
// router.post('/change/profile/MSSV=:id',studentController.change);

router.get('api/',loginController.authenticateToken,studentController.index);





// router.get('/',loginController.Check_user,newsController.index);



module.exports=router;