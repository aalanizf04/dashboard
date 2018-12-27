'use strict'

var express = require('express');
var UPermissionController = require('../controllers/upermission');
var api= express.Router();

api.post('/newpermission',UPermissionController.newPermission);
api.post('/change_permission/:id',UPermissionController.changeLevel);
api.delete('/permission/:id',UPermissionController.deletePermission);

module.exports= api;