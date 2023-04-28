const express = require('express');
const router=express.Router();
const hiepController=require('../app/controllers/HiepController');
const loginController=require('../app/controllers/LoginController');
router.get('/create',hiepController.create);
router.post('/store',hiepController.store);

router.get('/:slug',hiepController.show);








module.exports=router;