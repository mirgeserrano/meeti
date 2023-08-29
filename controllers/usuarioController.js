const  { check, validationResult } = require("express-validator")
const Usuarios = require("../models/Usuario")

exports.formCrearCuenta =(req, res) =>{
    res.render('crear-cuenta',{
        nombrePagina: "Crear Cuenta"
    })
}

exports.craerNuevaCuenta= async(req,res)=>{
    const usuario= req.body;
    await check("confirmar").notEmpty().withMessage("El password confirmado no puede ir vacio").run(req);

    await check("confirmar").equals(req.body.password).withMessage("El Password es diferente").run(req);
  
    let resultado = validationResult(req);
 // console.log(resultado);

    try {
     await Usuarios.create(usuario)
    
    // req.flash('exito', 'Hemos enviado un email, confirma tu cuenta');
     res.redirect('/iniciar-sesion')

    } catch (error) {
    const errorSequelize= error.errors.map(err=>err.message)

    //extrar unicamente  el msg de los erroes 
    const errExp= resultado.errors.map(err=>err.msg)

    //unir los errores
   const arrayDef= [...errorSequelize, ...errExp]

    req.flash('error', arrayDef) 
    res.redirect('/crear-cuenta')       
    }
    
}

exports.formIniciarSesion =(req, res) =>{
    res.render('iniciar-sesion',{
        nombrePagina: "Iniciar Sesion"
    })
}
