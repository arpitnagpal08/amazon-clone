const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var cartSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: "userModel"},
    total: {type: Number, default: 0},
    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: {type: Number, default: 1},
        price: {type: Number, default: 0}
    }]
})


module.exports = mongoose.model("cartSchema", cartSchema);