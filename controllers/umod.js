'use strict'

var UPermission = require('../models/upermission'); 
var bcrypt= require('bcrypt-nodejs'); 
var moment = require('moment');
var mongoosePaginate= require('mongoose-pagination');
var path = require('path');
var Umod = require('../models/umod');
var mongoose = require('mongoose');
var User = require('../models/user');

function newUModule(req,res){
	var umodule = new Umod();
	var uPermission = new UPermission();
	var params = req.body;

	//falta validacion de alias (unico?) e implementacion de la gatestatus, level y state desde peticion.
	umodule.alias = params.alias;
	umodule.location = params.location;
	umodule.gatestatus = 1;
	umodule.state = 2;
	umodule.lastAccess = 'null';
	umodule.permission.push(params.idupermission);			//guarda en la posicion 0 del array de permisos(usuario y nivel de permiso) del modulo

	umodule.save((err,umoduleStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el modulo'});
		}else{
			if(!umoduleStored){
				res.status(404).send({message: 'No se guardo el modulo'});
			}else{
				res.status(200).send({umodule: umoduleStored});
			}
		}
	});
}

function getUModule(req,res){

	var find = Umod.find({}).sort('alias');
	console.log(find);

	find.populate({path: 'permission', populate:{path: 'user'}}).exec((err,modulos) =>{
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!modulos){
				res.status(404).send({message: 'No hay modulos'});
			}else{
				res.status(200).send({modulos});
			}
		}
	});
}

function loadMyModules(req,res){	//funcion anterior (mal el nvo nombre) devuelve los modulos que 
	var ObjectId = mongoose.Types.ObjectId;
	var idUserToFind = req.params.id;
	console.log(typeof(idUserToFind));
	Umod.find({permission:{user: User({"_id": new ObjectId(idUserToFind)})}}, (err,modulos)=>{
		if(err){
			console.log(err);
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!modulos){
				res.status(404).send({message: 'No hay modulos'});
			}else{
				res.status(200).send({modulos});
			}
		}
	}).sort('alias');
}

function addUsertoUModule(req,res){
	var update = req.body;
	var umodId = req.params.id;

/* Averiguar luego que es el parametro sub
/*	if(userId!=req.user.sub){
		return res.status(500).send({message: 'No tienes permiso'}); //cuando detecta esto automaticamente se sale sin ejecutar las acciones de mas abajo
	}*/

	Umod.findById(umodId,(err,UmodtoMod) => {
		if(err){
			res.status(500).send({message: 'Error al agregar usuario al modulo'});
		}else{
			UmodtoMod.permission.push(update.idupermission);
			console.log(UmodtoMod);
			Umod(UmodtoMod).save((err2,newPermission) => {
			if(err2){
				console.log(err2);
				res.status(500).send({message: 'Error al guardar nuevo usuario del modulo a la base de datos'});
			}else{
				res.status(200).send({message: 'Ingresado'});
			}
			});
		}
	});

}

module.exports = {
	newUModule,
	getUModule,
	addUsertoUModule,
	loadMyModules
};