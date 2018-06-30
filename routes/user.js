const router = require("express").Router();
const userModel = require("../models/user")
const boom = require("boom");
const constants = require("../constants");
const passport = require("passport");
const passportConfig = require("./passport");

router.get("/signup", function(req, res){
    res.render("accounts/signup", {
        errors: req.flash("errors")
    })
})

router.post("/signup", function(req, res, next){
    var user = new userModel();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.profile.image = user.gravatar();

    userModel.findOne({email: req.body.email} , function(error, exists){
        if(exists) {
            req.flash("errors", constants.userFlashMessage.EMAIL_ALREADY_EXISTS)
            return res.redirect("/signup")
        }
        else{
            user.save(function(err, user){
                if(err) return boom.badRequest(constants.userFlashMessage.SIGNUP_ERROR)
                else {
                    req.logIn(user, function(error){
                        if(error) return next(error)
                        res.redirect("/profile")
                    })
                }
            })
        }
    })
})

router.get("/login", function(req, res){
    if(req.user) return res.redirect("/")
    else{
        res.render("accounts/login", {message: req.flash("loginMessage")})
    }
})

router.post("/login", passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
}))

router.get("/profile", function(req, res, cb){
    userModel.findOne({_id: req.user._id}, function(error, user){
        if(error) return cb(error)
        res.render("accounts/profile", {
            user: user
        })
    })
})

router.get("/logout", function(req, res, cb){
    req.logout();
    res.redirect("/")
})

router.get("/edit_profile", function(req, res, callback){
    res.render("accounts/edit_profile", {message: req.flash("success")})
})

router.post("/edit_profile", function(req, res, callback){

    userModel.findOne({_id: req.user._id}, function(error, result){
        if(error) return callback(error);
        if(req.body.name) result.profile.name = req.body.name;
        if(req.body.address) result.address = req.body.address;

        result.save(function(error){
            if(error) return callback(error);
            req.flash("success", constants.userFlashMessage.PROFILE_SUCCSS)
            return res.redirect("/profile")
        })
    })
})

module.exports = router