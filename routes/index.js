const express = require ('express');
const router= express.Router();
const homeController = require('../controllers/homeController')
const usuarioController = require('../controllers/usuarioController')
//const usuarioController = require('../controllers/craerNuevaCuenta')

module.exports = function() {
router.get('/', homeController.home)
router.get('/crear-cuenta',usuarioController.formCrearCuenta)
router.post('/crear-cuenta',usuarioController.craerNuevaCuenta)
//Iniciar sesion
router.get('/iniciar-sesion',usuarioController.formIniciarSesion)


return router;
} 