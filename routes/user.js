const router = require("express").Router();
const userModel = require("../models/user")
const boom = require("boom");

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
            req.flash("errors", `Account with email: ${req.body.email} already exists`)
            return res.redirect("/signup")
        }
        else{
            user.save(function(err, user){
                if(err) return boom.badRequest("Unable to signup")
                else {
                    return res.redirect("/")
                }
            })
        }
    })
})


module.exports = router