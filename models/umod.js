'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var UmodSchema = Schema({
	alias: String,
	gatestatus: Number,
	state: Number,
	location: String,
	lastAccess: String,
	permission: [{
		type: Schema.ObjectId,
		ref: 'User'
	}]
});

module.exports = mongoose.model('Module',UmodSchema);