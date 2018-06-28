const router = require("express").Router();
const userModel = require("../models/user")
const boom = require("boom");
const constants = require("../constants");

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

    userModel.findOne({email: req.body.email} , function(error, exists){
        if(exists) {
            req.flash("errors", constants.flash.EMAIL_ALREADY_EXISTS)
            return res.redirect("/signup")
        }
        else{
            user.save(function(err, user){
                if(err) return boom.badRequest(constants.flash.SIGNUP_ERROR)
                else {
                    return res.redirect("/")
                }
            })
        }
    })
})


module.exports = router