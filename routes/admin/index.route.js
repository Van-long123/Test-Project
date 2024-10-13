const systemConfig=require("../../config/system")
const dashboardRouter=require('./dashboard.route')
const productRouter=require('./product.route')
const orderRouter=require('./order.route')
const categoriesRouter=require('./products-category.route')
const rolesRouter=require('./role.route')
const accountRouter=require('./account.route')
const authRouter=require('./auth.route')
const userRouter=require('./user.route')
const myAccountRouter=require('./my-account.route')
const settingRouter=require('./setting.route')
const authMiddleware=require('../../middleware/admin/auth.middleware')
module.exports=(app)=>{
    const PATH_ADMIN=systemConfig.prefixAdmin
    // app.use(authMiddleware.requireAuth)
    app.use(PATH_ADMIN+'/dashboard',authMiddleware.requireAuth,dashboardRouter)    
    app.use(PATH_ADMIN+'/products',authMiddleware.requireAuth,productRouter)    
    app.use(PATH_ADMIN+'/orders',authMiddleware.requireAuth,orderRouter)    
    app.use(PATH_ADMIN+'/products-category',authMiddleware.requireAuth,categoriesRouter)    
    app.use(PATH_ADMIN+'/roles',authMiddleware.requireAuth,rolesRouter)    
    app.use(PATH_ADMIN+'/accounts',authMiddleware.requireAuth,accountRouter)    
    app.use(PATH_ADMIN+'/users',authMiddleware.requireAuth,userRouter)    
    app.use(PATH_ADMIN+'/auth',authRouter)    
    app.use(PATH_ADMIN+'/my-account',authMiddleware.requireAuth,myAccountRouter)
    app.use(PATH_ADMIN+'/settings',authMiddleware.requireAuth,settingRouter)

}