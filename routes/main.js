const router = require("express").Router();
const productSchema = require("../models/product")

router.get("/", (req, res) => {
    res.render("main/home")
})

router.get("/about", (req, res) => {
    res.render("main/about")
})

router.get("/products/:id", (req, res, callback) => {
    productSchema
    .find({category: req.params.id})
    .populate("category")
    .exec(function(error, products){
        if(error) callback(error)
        else{
            res.render("main/category", {
                products: products
            })
        }
    })
})

module.exports = router