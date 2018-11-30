'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var api= express.Router();

api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.get('/users/:page',UserController.getUsers);

module.exports= api;