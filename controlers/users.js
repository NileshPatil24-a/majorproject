const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.siginup=async(req,res)=>{
    try{
     let {username, password,email} =req.body;
     const newUser= new User({username,email});
     const registerUser = await User.register(newUser,password);
     console.log(registerUser);
     req.login(registerUser,(err)=>{
         if(err){
             return next(err);
         }
         req.flash("success","welcome to wanderlust");
         res.redirect("/listings");
     });
    }catch(err){
     req.flash("error",err.message);
     res.redirect("/signup");
    };
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","welcome to wanderlust! ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You logout now!");
        res.redirect("listings");
    });
};