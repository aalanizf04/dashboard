'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name: String,
	email: String,
	phone: String,
	username: String,
	password: String
});

module.exports = mongoose.model('User',UserSchema);