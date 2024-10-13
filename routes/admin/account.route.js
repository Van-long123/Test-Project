const express=require("express")
const Routes=express.Router();
const multer=require("multer");
const upload=multer();
const uploadCloud=require('../../middleware/admin/uploadCloud.middleware')
const controller=require('../../controllers/admin/account.controller')
const validate=require('../../validates/admin/account.validate')
Routes.get('/',controller.index)
Routes.patch('/change-status/:status/:id',controller.changeStatus)
Routes.delete('/delete/:id',controller.deleteItem)
Routes.patch('/change-multi/',controller.changeMulti)
Routes.get('/detail/:id',controller.detail)

Routes.get('/create',controller.create)
Routes.post('/create',upload.single('avatar'),validate.createPost,uploadCloud.upload,controller.createPost)

Routes.get('/edit/:id',controller.edit)
Routes.patch('/edit/:id',upload.single('avatar'),validate.editPatch,uploadCloud.upload,controller.editPatch)
module.exports=Routes