'use strict'

var express = require('express');
var UModuleController = require('../controllers/umod');
var api= express.Router();

api.post('/registermodule',UModuleController.newUModule);
api.get('/module',UModuleController.getUModule);
api.get('/module/:id',UModuleController.loadMyModules);
api.post('/addUsertoModule/:id',UModuleController.addUsertoUModule);

module.exports= api;