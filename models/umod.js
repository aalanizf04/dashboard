'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var gate_Status = require('./gateStatus');
var State = require('./state');
//var UPermission = mongoose.model('UPermission');

var UmodSchema = Schema({
	alias: String,
	gatestatus: gate_Status,
	state: State,
	location:{
		lat:String,
		lon:String
	},
	lastAccess: String,
	permission: [{
		type: Schema.ObjectId,
		ref: 'UPermission'
	}],
});

module.exports = mongoose.model('UMod',UmodSchema);