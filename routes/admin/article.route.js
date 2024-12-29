const express=require('express')
const router=express.Router();
const multer = require('multer');
const upload = multer();
// const uploadCloud=require('../../middleware/admin/uploadCloud.middleware')
const controller=require('../../controllers/admin/articles.controller')
router.get('/',controller.index)
module.exports = router