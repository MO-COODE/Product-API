const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const productController = require('../Controllers/product.controller')

    // *** check Controllers for the details of the function *** //

        // *** getting all products *** //
router.get('/', productController.getAllProducts);

        // *** posting or creating a product *** //
router.post('/', productController.createNewProduct)

        // *** getting a single product *** //
router.get('/:id', productController.findSingleProduct);


        // *** updating a product *** //
router.patch('/:id', productController.updatingSingleProduct);


        // *** deleting a product *** //
router.delete('/:id', productController.deletingProduct)

module.exports = router;