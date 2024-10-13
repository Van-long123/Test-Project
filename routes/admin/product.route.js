const express=require('express')
const Routes=express.Router();
const multer  = require('multer')
const upload=multer()
const controller=require('../../controllers/admin/product.controller')
// const storageMulter=require('../../helpers/storageMulter')
// const upload=multer({storage:storageMulter})
const uploadCloud=require('../../middleware/admin/uploadCloud.middleware')
const validate=require('../../validates/admin/product.validate')
Routes.get('/',controller.index)
Routes.patch('/change-status/:status/:id',controller.changeStatus)
Routes.delete('/delete/:id',controller.deleteItem)
Routes.patch('/change-multi/',controller.changeMulti)
Routes.get('/detail/:id',controller.detail)
Routes.get('/create',controller.create)
Routes.post('/create',upload.single('thumbnail'),validate.createPost,uploadCloud.upload,controller.createPost)

Routes.get('/edit/:id',controller.edit)
Routes.patch('/edit/:id',upload.single('thumbnail'),validate.createPost,uploadCloud.upload,controller.editPatch)


module.exports=Routes;