'use strict'

var Upermission = require('../models/upermission'); 
var bcrypt= require('bcrypt-nodejs'); 
var moment = require('moment');
var mongoosePaginate= require('mongoose-pagination');
var path = require('path');
var user = require('../models/user');

function newPermission(req,res){
	var upermission= new Upermission();

	var params = req.body;

	//falta validacion de alias (unico?) e implementacion de la gatestatus, level y state desde peticion.
	upermission.user = params.user;
	upermission.level= Number(params.level);

	upermission.save((err,upermissionStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el permiso'});
		}else{
			if(!upermissionStored){
				res.status(404).send({message: 'No se guardo el permiso'});
			}else{
				res.status(200).send({upermission: upermissionStored});
			}
		}
	});
}

function changeLevel(req,res){ //falta terminar con findByIdandUpdate
	var upermId = req.params.id;
	if(req.body.up){				//Si la peticion no viene con el campo up, pasa al else; si viene con cualquier valor entra en if
		var update = {level:2};
		var message = "El user ya es Administrador";
	}else{
		var update = {level:1};
		var message = "El user ya es Usuario";
	}
	
	Upermission.findByIdAndUpdate(upermId,update,(err,PermissiontoChange) => {
		if(err){
			res.status(500).send({message: 'Error al subir el nivel del usuario'});
		}else{
			if(!PermissiontoChange){
				return res.status(404).send({message: 'No se encontró el permiso'});
			}else{
					return res.status(200).send({message});
			}
		}
	});
}

function deletePermission(req,res){
	var upermId = req.params.id;

	Upermission.findByIdAndRemove(upermId,(err,PermissionDeleted) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el permiso de usuario'});
		}else{
			if(!PermissionDeleted){
				return res.status(404).send({message: 'No se encontró el permiso'});
			}else{
					return res.status(200).send({Upermission:PermissionDeleted});
			}
		}
	});
}

module.exports = {
	newPermission,
	changeLevel,
	deletePermission
};