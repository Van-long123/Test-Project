const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const passport=require('passport');
const User = require('./model/user.model');

// cấu hình passport để cho phép người dùng đăng nhập thông qua tài khoản Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // nơi Google chuyển hướng sau khi xác thực thành công
    callbackURL: "https://food-project-nu-opal.vercel.app/auth/google/callback"
  },
    async (accessToken, refreshToken, profile, cb) =>{
        // thêm user ở đây 
        if(profile?.id){
            const email=profile.emails[0]?.value
            const existUser=await User.findOne({
                _id:profile.id,
            })
            if(!existUser){
                const user=new User({
                    _id:profile.id,
                    email:email,
                    fullname:profile.displayName,
                    typeLogin:profile.provider,
                    avatar:profile.photos[0].value,
                })
                await user.save()
            }
            else{
                //cập nhật token nếu tạo 1 router login-success
            }
        }
        return cb(null, profile);//để null là luôn thành công là luôn gọi lại /auth/google/callback
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://test-project-lovat-eta.vercel.app/facebook/callback",
    // profileFields: ['id', 'email', 'name'] được sử dụng để chỉ định các
    //  trường thông tin (fields) mà bạn muốn nhận từ Facebook khi 
    // người dùng đăng nhập qua Facebook OAuth.
    profileFields: [ 'id', 'email',  'photos', 'displayName'],
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    cb(null, profile);
  }
));
