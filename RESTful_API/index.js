
const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const app = express();

app.use(express.json())

// *** mongodb connection *** //

// local connection: mongodb://localhost:27017/bookstore

mongoose.connect('mongodb+srv://Netninja:test123456@cluster0.tghfjg2.mongodb.net/', 
{
    dbName: "mydb",
    /* user: "Netninja",
    password: "test123456", */
    useNewUrlParser: true,
    useUnifiedTopology: true //both of these have no effects
})
    .then((req, res) => {
        console.log('mongodb connected...');
    })
    .catch(err => {
        console.log(err.message);
    });

    // *** for successful connection to mongoose *** //

    mongoose.connection.on('connected', () => {
        console.log('mongoose connected to db')
    });

    // *** for error in connection to mongoose *** //
    mongoose.connection.on('err', () => {
        console.log(err.message)
    });


    // *** for disconnection to mongoose *** //
    mongoose.connection.on('disconnected', () => {
        console.log('mongoose connection terminated')
    });

    
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('mongoose disconnected');
            process.exit(0)
        });   
    });

    


    // *** query *** //
    /* app.get('/test', (req, res) => {
        console.log(req.query.price);
        res.send(req.query);
    }); */


     // *** params *** //
   /*  app.all('/test/:id/:name', (req, res) => {
        console.log(req.params);
        res.send(req.params);
    }); */

    // *** getting body from client *** //
    /* app.post('/test/', (req, res) => {
        console.log(req.body);
        res.send(req.body);
    }); */



const productsRoute = require('./Route/Products.route');
app.use('/products', productsRoute);


// *** HANDLING ERRORS *** //
app.use((req, res, next) => {
   /*  res.send(404);
    res.send({error: "not found"}) */

    // or using middleware below

    next(createError(404, 'Not found'))
});


//mongoose.connect('mongodb://localhost:27017/')


app.listen(3000, () => {
    console.log('server is running')
})