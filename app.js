'use strict'

var express= require('express'); 
var bodyParser = require('body-parser');

var app= express(); //crea el objeto de express en la variable app

//cargar rutas
var user_routes= require('./routes/user');
var umod_routes= require('./routes/umod');
var upermission_routes= require('./routes/upermission');

app.use(bodyParser.urlencoded({extended: false})); // configurar bodyParser
app.use(bodyParser.json()); // convertir a objetos json las peticiones desde http

//config cabeceras http

//cargar rutas base
app.use('/api', user_routes);
app.use('/api', umod_routes);
app.use('/api', upermission_routes);

module.exports= app;