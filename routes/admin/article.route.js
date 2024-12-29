const express=require('express')
const router=express.Router();
const multer = require('multer');
const upload = multer();
const validate=require('../../validates/admin/products-category')
const uploadCloud=require('../../middleware/admin/uploadCloud.middleware')
const controller=require('../../controllers/admin/articles.controller')
router.get('/',controller.index)
router.patch('/change-status/:status/:id',controller.changeStatus)
router.delete('/delete/:id',controller.deleteItem)
router.get('/detail/:id',controller.detail)
router.patch('/change-multi',controller.changeMulti)
router.get('/create',controller.create)
router.post('/create',upload.single('thumbnail'),validate.createPost,uploadCloud.upload,controller.createPost)
router.get('/edit/:id',controller.edit)
router.patch('/edit/:id',upload.single('thumbnail'),validate.createPost,uploadCloud.upload,controller.editPatch)
module.exports = router