'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var level_permission = require('./level'); 

var UPermissionSchema = Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	level: level_permission
});

module.exports = mongoose.model('UPermission',UPermissionSchema);