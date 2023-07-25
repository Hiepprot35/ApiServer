const express = require('express');
var cors = require('cors')

const router=express.Router();
const studentController=require('../app/controllers/StudentController');
const loginController=require('../app/controllers/LoginController');


// router.get('/dangky',studentController.createView);
// router.post('/store',studentController.createstudent);

// router.get('/login',loginController.checkLogined,loginController.login)
// router.post('/login',loginController.logincheck)
// router.get('/logout',loginController.logout)
router.post('/api/login',loginController.loginAPI)

router.get('/getallstudent',cors(),studentController.getAllStudents)
router.post('/api/createStudent',studentController.createstudent)
router.get('/api/getAllClass',studentController.getAllClassApi)

// router.get('/change/profile/MSSV=:id',studentController.findid);
// router.post('/change/profile/MSSV=:id',studentController.change);

// router.get('/',loginController.authenticateToken,studentController.index);





// router.get('/',loginController.Check_user,newsController.index);



module.exports=router;