'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');
const {createUserSchema, updateUserSchema, getUserLogin} = require('../validationSchema/userRegister');
const validationSchema = require('../middlewares/requestValidation');

var api = express.Router();

api.get('/user/:id',  UserController.getUser);
api.post('/register',UserController.saveUser, validationSchema(createUserSchema)); 
api.put('/user/:id', [validationSchema(updateUserSchema), md_auth.ensureAuth], UserController.updateUser);
api.delete('/user/:id', md_auth.ensureAuth, UserController.deleteUser);
api.post('/login', validationSchema(getUserLogin), UserController.loginUser);

module.exports = api;

