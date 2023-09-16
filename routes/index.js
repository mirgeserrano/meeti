const express = require ('express');
const router= express.Router();
const homeController = require('../controllers/homeController')
const usuarioController = require('../controllers/usuarioController')
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const grupoController = require('../controllers/gruposController')


module.exports = function() {
router.get('/', homeController.home)

//Craer y confimar cuenta 
router.get('/crear-cuenta',usuarioController.formCrearCuenta)
router.post('/crear-cuenta',usuarioController.craerNuevaCuenta)
router.get('/confirmar-cuenta/:correo',usuarioController.confimarCuenta)


//Iniciar sesion
router.get('/iniciar-sesion',usuarioController.formIniciarSesion)
router.post('/iniciar-sesion',authController.autentificarUsuario)

//panel de adminitracion
router.get('/administracion',
authController.usuarioAutenticado,
adminController.panelAdminitracion)


//nuevos grupos

router.get('/nuevo-grupo',
authController.usuarioAutenticado,
grupoController.formNuevoGrupo)

router.post('/nuevo-grupo',
authController.usuarioAutenticado,
grupoController.crearGrupo)


return router;
} 