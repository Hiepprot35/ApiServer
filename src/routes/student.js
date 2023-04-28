const express = require('express');
const router=express.Router();
const studentController=require('../app/controllers/StudentController');
const loginController=require('../app/controllers/LoginController');


router.get('/create',studentController.create);
router.post('/store',studentController.store);

router.get('/login',loginController.login)
router.post('/login',loginController.logincheck)

router.get('/change/profile/MSSV=:id',studentController.findid);
router.post('/change/profile/MSSV=:id',studentController.change);

router.get('/',loginController.authenticateToken,studentController.index);





// router.get('/',loginController.Check_user,newsController.index);



module.exports=router;