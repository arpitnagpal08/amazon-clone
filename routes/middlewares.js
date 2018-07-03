var cartSchema = require("../models/cart");

module.exports = function(req, res, callback){
    if(req.user){
        var total = 0;
        cartSchema.findOne({owner: req.user._id}, function(error, response){
            if(response){
                for(key in response.items.length){
                    total += response.items[key].quantity
                }
                res.locals.cart = total
            }
            else{
                res.locals.cart = 0;
            }
            callback()
        })
    }
    else{
        callback()
    }
}