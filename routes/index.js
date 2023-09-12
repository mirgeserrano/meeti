const express = require ('express');
const router= express.Router();
const homeController = require('../controllers/homeController')
const usuarioController = require('../controllers/usuarioController')


module.exports = function() {
router.get('/', homeController.home)

//Craer y confimar cuenta 
router.get('/crear-cuenta',usuarioController.formCrearCuenta)
router.post('/crear-cuenta',usuarioController.craerNuevaCuenta)
router.get('/confirmar-cuenta/:correo',usuarioController.confimarCuenta)


//Iniciar sesion
router.get('/iniciar-sesion',usuarioController.formIniciarSesion)


return router;
} 