const express = require('express');
const path =require('path')
const router = require('./routes'); 
const bodyParser = require('body-parser'); 
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash= require('connect-flash')
require('dotenv').config({path:'variables.env'})

//Configuarion y modulo de la base de datos
const db = require("./config/db.js");
const { ExpressValidator } = require('express-validator');
require('./models/Usuario.js')

//conexion a la base de datos
db.sync().then(() => console.log(' DB conectada')).catch((error)=>console.log(error))

//habilitar aplicacion
const app= express();

//body parser, leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//Habilitar EJS como temple engine
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')

//Ubicacion vistas
app.set('views', path.join(__dirname,'./views'))

//archivos staticos
app.use(express.static('public'))

//habilita cookie parser
app.use(cookieParser());

//Habilita la seccion
app.use(session({
    secret:process.env.SECRETO,
    key: process.env.KEY,
    resave:false,
    saveUninitialized:false

}))

//agrega Flash messages
app.use(flash());


//Middlware (usuario logeado, flash messaje, fecha catial)
app.use ((req, res, next)=>{
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
})

//routing
app.use('/',router())

//agregar puerto
app.listen(process.env.PORT,()=>{
    console.log('Servidor Corriendo 5000');
})