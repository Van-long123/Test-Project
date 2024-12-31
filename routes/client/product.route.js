const express = require('express');
const Router=express()  
const controller=require('../../controllers/client/product.controller')
const validate=require('../../validates/client/product.validate')

Router.get('/',controller.index)
Router.get('/featured',controller.featured)
Router.get('/:slugCategory', controller.category)
Router.post('/comment',validate.comment,controller.comment)
Router.post('/rate',controller.rate)

module.exports =Router