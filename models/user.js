const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto")
const bcrypt = require("bcrypt-nodejs");

//The User Model
var userModel = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    profile: {
        name: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        }
    },
    address: String,
    history: [{
        date: Date,
        paid: {
            type: Number,
            default: 0
        }
    }]
})


//Hash the password before even saving to database
userModel.pre("save", function(next){
    var user = this;
    if(!user.isModified){
        return next()
    }
    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(error, hash){
            if(error) return next(error)
            user.password = hash;
            next()
        });
    });
});


//compare password in the database and the one that the use type in
userModel.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}


userModel.methods.gravatar = function(size){
    if(!this.size) size = 200;
    if(!this.email) return "https://gravatar.com/avatar/?s=" + size + "&d=retro";
    var md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return "https://gravatar.com/avatar/" + md5 + "?s=" + size + "&d=retro"
}

module.exports = mongoose.model("userModel", userModel);