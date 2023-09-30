'use strict'

const express = require('express');
const MovementController = require('../controllers/movement');

var api = express.Router();
api.get('/movement/:_id', MovementController.getMovement);

module.exports = api;
