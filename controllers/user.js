'use strict'

var User = require('../models/user'); 
var bcrypt= require('bcrypt-nodejs'); 
var moment = require('moment');

function saveUser(req, res){
	var user= new User();
	var params= req.body;
	console.log(params);

	user.username = params.username;
	user.salt= '';
	user.is_superuser= false;
	user.created= moment();


	if(params.password){
		bcrypt.hash(params.password,null,null,function(err,hash){
			user.password=hash;
			if(user.username!=null){
				user.save((err,userStored) =>{
					if(err){
						res.status(500).send({message: 'Error al guardar el usuario'});
					} else{
						if(!userStored){
							res.status(404).send({message: 'No se registro el usuario'});
						} else{
							res.status(200).send({user: userStored});
						}
					}
				});
			}else{
				res.status(200).send({message: 'faltan campos'});
			}
		});
	} else{
		res.status(500).send({message: 'falta contraseña'});
	}
}

function loginUser(req,res){
	var params= req.body;
	var username= params.username;
	var password=params.password;

	User.findOne({username: username.toLowerCase()}, (err,user)=>{
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				bcrypt.compare(password, user.password, function(err,check){
					if(check){
						if(params.gethash){	//si existe gethash, devuelve un token de jwt, se genera un token con el objeto del usuario (con todos los datos)
							//devuelve un token de jwt
							res.status(200).send({user})
							//res.status(200).send({token: jwt.createToken(user)});
						}else{
							res.status(200).send({user})
						}
					}else{
						res.status(404).send({message: 'El usuario no ha podido loggearse '});
					}
				});
			}
		}
	})
}

module.exports = {
	saveUser,
	loginUser,
};