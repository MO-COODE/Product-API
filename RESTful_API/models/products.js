

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// *** product schema *** //
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }  
})

// *** product model *** //
const Product = mongoose.model('product', productSchema);

module.exports = Product;




