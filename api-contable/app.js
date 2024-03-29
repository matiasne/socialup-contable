'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas
var user_routes = require('./routes/user');
var business_routes = require('./routes/business');
var product_routes = require('./routes/product');
var client_routes = require('./routes/client');
var sale_routes = require('./routes/sale');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cabeceras hhtp
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', user_routes);
app.use('/api', business_routes);
app.use('/api', product_routes);
app.use('/api', client_routes);
app.use('/api', sale_routes);
module.exports = app;

