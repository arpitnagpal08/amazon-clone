const router = require("express").Router();
const async = require("async");
var faker = require("faker");
const categorySchema = require("../models/category");
const productSchema = require("../models/product");

const constants = require("../constants")

router.get("/:name", function(req, res, callback){
    var tasks = [];
    var name = req.params.name;

    tasks.push(getCategoryByName.bind(null, name))
    tasks.push(saveProducts.bind(null))

    async.waterfall(tasks, function(err, result){
        if(err) callback(error)
        else {
            res.json(constants.adminFlashMessage.SUCCESSFULLY_ADDED_PRODUCT)
            callback()
        }
    })

    function getCategoryByName(name, cb){
        categorySchema.findOne({name: name }, function(error, response){
            if(error) callback(error)
            else {
                cb(null, response)
            }
        })
    }

    function saveProducts(response, cb){
        const product = new productSchema;
        product.category = response._id;
        product.name = faker.commerce.productName();
        product.price = faker.commerce.price();
        product.image = faker.image.image();

        product.save()
        cb()
    }
})

router.post("/search", function(req, res, callback){
    console.log(req.body.search_item)
    productSchema.search({
        query_string: {
            query: req.body.search_item
        }
    }, function(error, result){
        if(error) callback(error)
        else{
            res.json(result)
        }
    })
})


module.exports = router;