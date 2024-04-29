const Product = require('../models/products');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports = {

    // *** getting all products *** //
    getAllProducts: (req, res, next) => {
    
        Product.find({/* price: 1580 */}, {__v: 0 /* , _id: 0 */})
            .then(result => {
                res.send(result)
            })
            .catch(err => {
                console.log(err.message)
            })
    },

        // *** posting or creating new product *** //
        // *** async and await *** //
    createNewProduct:  async(req, res, next) => {
        console.log(req.body)

        try {
            const product = new Product(req.body)
            const result = await product.save()
            res.send(result)
        } catch (err) {

        console.log(err.message);

        // *** handling errors *** //
        if (err === 'validationError'){
            next(createError(422, err.message))
            return;
        }
        next(err.message);
        }

    // end of async and await *** //

    // *** promises *** //
    /* router.post('/', (req, res, next) => {
    console.log(req.body)

    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });


    product.save()
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(err => {
            console.log(err.message);
        })
    }); */
    // *** end of promises *** //
    
    },

    
    // *** getting a single product *** //
    findSingleProduct: (req, res, next) => {
        const id = req.params.id
        
        //Product.findOne({_id: id}) 
        Product.findById(id)
            .then(result => {
               
                res.send(result)
                console.log(result);
    
                // *** handling error ** //
                if(!result) {
                    throw createError(404, 'product does not exist')
                }
                res.send(result);
            })
            .catch(err => {
                console.log(err.message);
                if(err instanceof mongoose.CastError) {
                    next(createError(404, 'invalid product id'))
                    return;
                }
                next(err.message)
            })
    },
    


    // *** updating single product *** //
    updatingSingleProduct: async(req, res, next) => {
        //res.send('updating a single product')

        const id = req.params.id;
        const updates = req.body;
        const options = { new: true } // this has no effect in postman but does in rest

        try {
            const result = await Product.findByIdAndUpdate(id, updates, options)
            res.send(result);

            // *** handling error ** //
            if(!result) {
                throw createError(404, 'product does not exist')
            };
            res.send(result)
        
        } catch (err) {

            // *** handling error *** //
            if(err instanceof mongoose.CastError) {
                next(createError(404, 'invalid product id'))
                return;
            }
            next(err.message)

            console.log(err.message)
        }
    },


    // *** deleting a product *** //
    deletingProduct: async(req, res, next) => {
        //res.send('deleting a single product')
        const id = req.params.id;
        try {
            const result = await Product.findByIdAndDelete(id)
            res.send(result);
    
             // *** handling error ** //
             if(!result) {
                throw createError(404, 'product does not exist')
            };
            res.send(result)
    
        } catch (err) {
    
            // *** handling error *** //
            if(err instanceof mongoose.CastError) {
                next(createError(404, 'invalid product id'))
                return;
            }
            next(err.message)
    
            console.log(err.message)
        }
    }
}