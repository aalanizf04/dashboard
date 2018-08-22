'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	username: String,
	password: String,
	salt: String,
	is_superuser: Boolean,
	created: String
});

module.exports = mongoose.model('User',UserSchema);