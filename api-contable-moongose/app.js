"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Cargar rutas
const user_routes = require("./routes/user");
const business_routes = require("./routes/business");
const product_routes = require("./routes/product");
const client_routes = require("./routes/client");
const sale_routes = require("./routes/sale");
const box_routes = require("./routes/box");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cabeceras hhtp
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use("/api", box_routes);
app.use("/api", user_routes);
app.use("/api", business_routes);
app.use("/api", product_routes);
app.use("/api", client_routes);
app.use("/api", sale_routes);

module.exports = app;
