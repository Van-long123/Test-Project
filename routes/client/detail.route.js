const express=require('express')
const Routes=express.Router()
const controller=require('../../controllers/client/detail.controller')
Routes.get('/:slugProduct',controller.detail)
module.exports=Routes
