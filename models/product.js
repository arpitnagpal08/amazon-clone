const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosastic = require("mongoosastic")

var productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    name: String,
    price: Number,
    image: String
})

productSchema.plugin(mongoosastic, {
    hosts: [
        config.get("mongoosastic.hosts")
    ]
})

module.exports = mongoose.model("product", productSchema)