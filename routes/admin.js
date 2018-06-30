const router = require("express").Router();
const categoryModel = require("../models/category");
const constants = require("../constants")

router.get("/add_category", function(req, res, callback){
    if(req.flash("error")){
        res.render("admin/add_category", {message: req.flash("error"), color: "red"})
    }
    else{
        res.render("admin/add_category", {message: req.flash("success"), color: "green"})
    }
});

router.post("/add_category", function(req, res, callback){
    var category = new categoryModel();

    category.name = req.body.name;

    categoryModel.findOne({name: req.body.name}, function(error, exists){
        if(error) callback(error)
        else if(exists) {
            req.flash("error", constants.adminFlashMessage.ALREADY_EXISTS)
            return res.redirect("/add_category")
        }
        else{
            category.save(function(error){
                if(error) return callback(error);
        
                req.flash("success", constants.adminFlashMessage.SUCCESSFULLY_ADDED_CATEGORY)
                return res.redirect("/add_category")
            })
        }
    })
})


module.exports = router