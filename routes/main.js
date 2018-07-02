const router = require("express").Router();
const productSchema = require("../models/product")

var stream = productSchema.synchronize();
var count = 0;

function paginate(req,res, callback){
    var perPage = 6;
    var page = req.params.page;

    productSchema
        .find()
        .skip( perPage * page )
        .limit(perPage)
        .populate("category")
        .exec(function(err, response){
            if(err) return callback(err)
            productSchema.count().exec(function(err, count){
                if(err) callback(err)
                res.render("main/product_main", {
                    products: response,
                    pages: count / perPage,
                    currentPage: req.params.page
                })
            })
        })
}

stream.on("data", function(){
    count++
})

stream.on("close", function(){
    console.log("Indexed " + count + " documents");
})

stream.on("error", function(error){
    console.log(error)
})

router.post("/search", function(req, res, callback){
    res.redirect("/search?q=" + req.body.q)
})

router.get("/search", function(req, res, callback){
    if(req.query.q){
        productSchema.search({
            query_string: {query: req.query.q}
        }, function(error, result){
            if(error) return callback(error)

            var data = result.hits.hits.map(function(res){
                return res
            })
            res.render("main/search_result.ejs", {
                query: req.query.q,
                data: data
            })
        })
    }
})

router.get("/", (req, res, callback) => {
    if(req.user){
        paginate(req, res, callback)
    }
    else{
        res.render("main/home")
    }
})

router.get("/page/:page", (req, res, callback) => {
    paginate(req, res, callback)
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