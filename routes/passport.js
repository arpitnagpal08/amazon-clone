const passport = require("passport");
const localStratergy = require("passport-local").Strategy;
const user = require("../models/user");
const constants = require("../constants");

//serialize and deserialize
passport.serializeUser(function(user, callback){
    callback(null, user._id)
})

passport.deserializeUser(function(id, cb){
    user.findById(id, function(err, user){
        cb(null, user)
    })
})


//middleware
passport.use("local-login", new localStratergy({
    usernameField: constants.passportMiddleware.USERNAME_FIELD,
    passwordField: constants.passportMiddleware.PASSWORD_FIELD,
    passReqToCallback: constants.passportMiddleware.PASS_REQ_TO_CALLBACK
}, function(req, email, password, callback){
    user.findOne({email: email}, function(error, user){
        if(error) return callback(error)
        
        if(!user){
            return callback(null, false, req.flash("lognMessage", constants.flash.NO_USER))
        }

        if(!user.comparePassword(password)){
            return callback(null, false, req.flash("loginMessage", constants.flash.WRONG_PASSWORD))
        }

        return callback(null, user)

    })
}))


//custom function to authenticate
exports.isAuthenticated = function(req, res, callback){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}