const express=require('express')
const Routes=express.Router()
const multer=require('multer')
const upload=multer()
const controller=require('../../controllers/admin/setting.controller')
const uploadCloud=require('../../middleware/admin/uploadCloud.middleware')
Routes.get('/general',controller.general)
Routes.patch('/general',upload.single('logo'),uploadCloud.upload,controller.generalPatch)
module.exports=Routes