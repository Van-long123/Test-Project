const express=require('express')
const Routes=express.Router()
const controller=require('../../controllers/client/home.controller')
Routes.get('/',controller.index)
module.exports=Routes