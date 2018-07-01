const router = require("express").Router();
const productSchema = require("../models/product")

var stream = productSchema.synchronize();
var count = 0;

stream.on("data", function(){
    count++
})

stream.on("close", function(){
    console.log("Indexed " + count + " documents");
})

stream.on("error", function(error){
    console.log(error)
})

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

router.get("/product/:id", (req, res, callback) => {
    productSchema.findById({_id: req.params.id}, function(error, product){
        if(error) callback(error)
        else{
            res.render("main/product", {
                product: product
            })
        }
    })
})

module.exports = router