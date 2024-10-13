const express=require("express")
const Routes=express.Router();
const controller=require('../../controllers/admin/auth.controller')
const validate=require('../../validates/admin/auth.validate')
Routes.get('/login',controller.login)
Routes.post('/login',validate.loginPost,controller.loginPost)
Routes.get('/logout',controller.logout)

module.exports=Routes