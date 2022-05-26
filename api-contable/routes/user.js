'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');
var md_uploadFile = require('../middlewares/upload-file')
const {createUserSchema, updateUserSchema, getUserLogin} = require('../validationSchema/userRegister');
const validationSchema = require('../middlewares/requestValidation');

var api = express.Router();


api.get('/user/:id',  UserController.getUser);
api.post('/register',UserController.saveUser, validationSchema(createUserSchema)); 
api.put('/user/:_id', [validationSchema(updateUserSchema), md_auth.ensureAuth, md_uploadFile.single('image')], UserController.updateUser);
api.delete('/user/:id', md_auth.ensureAuth, UserController.deleteUser);
api.post('/login', validationSchema(getUserLogin), UserController.loginUser);
api.get('/user/file/:imageFile',UserController.getUserImageFile);

module.exports = api;

