const express=require("express")
const Routes=express.Router();
const multer  = require('multer')
const upload = multer()
const uploadCloud=require("../../middleware/admin/uploadCloud.middleware")


const controller=require("../../controllers/admin/my-account.controller")

Routes.get('/',controller.index)
Routes.get('/edit',controller.edit)

Routes.patch('/edit',upload.single('avatar'),uploadCloud.upload, controller.editPatch);//hiển thị view edit


module.exports=Routes