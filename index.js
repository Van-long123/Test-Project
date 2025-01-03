const express = require('express');
const app = express();
const systemConfig=require('./config/system')
const routeAdmin=require('./routes/admin/index.route')
const route=require('./routes/client/index.route')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const moment=require('moment')
require('dotenv').config();
const mongoose = require('mongoose');
const port=process.env.PORT;
const database=require('./config/database')
const flash = require('express-flash')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
app.set('view engine', 'pug');
app.set('views',`${__dirname}/views`)
app.use(express.static(`${__dirname}/public`));
const passport=require('./passport')
// TinyMCE 
var path = require('path');
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// TinyMCE 

// flash 
app.use(express.json());
app.use(cookieParser('DSADSADSF'));
app.use(session({ cookie: { maxAge: 60000 }}));//thời gian cookie tồn tại 1 phút
app.use(flash());
// flash 
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride('_method'))



database.connect()
app.locals.prefixAdmin=systemConfig.prefixAdmin
app.locals.moment=moment
// app.get('/',(req,res)=>{
//     res.send("okd")
// })
routeAdmin(app)
route(app)

app.get('*',(req,res)=>{
    res.render('client/pages/errors/404',{
        title:'404 Not Found'
    })
})
app.listen(port,()=>{
    console.log("http://localhost:3000/")
})