const express = require('express')
const Routes=express.Router();
const controller=require('../../controllers/admin/role.controller')
const validate=require('../../validates/admin/role.validate')
Routes.get('/',controller.index)
Routes.get('/create',controller.create)
Routes.post('/create',validate.createPost,controller.createPost)
Routes.get('/edit/:id',controller.edit)
Routes.patch('/edit/:id',validate.editPost,controller.editPost)
Routes.get('/permissions',controller.permissions)
Routes.patch('/permissions',controller.permissionsPatch)
Routes.delete('/delete/:id',controller.deleteItem)
module.exports=Routes