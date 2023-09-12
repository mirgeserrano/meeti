const  { check, validationResult } = require("express-validator")
const Usuarios = require("../models/Usuario")
const  enviarEmail = require("../handlers/emails.js")

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

     //url de configuacion
     const url =`http://${req.headers.host}/confirmar-cuenta/${usuario.email}`
    //Enviar imail de confimacion
    
    await enviarEmail.enviarEmail({
        usuario,
        url,
        subjet:'confimar tu cuenta de Metti',
        archivo:'confirmar-cuenta',
    })
    
    req.flash('exito', 'Hemos enviado un email, confirma tu cuenta')
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

exports.confimarCuenta=async(req, res, next)=>{
//verficar que el usuario exista
const usuario= await Usuarios.findOne({where :{email:req.params.correo}})

//Si el usuraio existe 
if (!usuario) {
    req.flash('error', 'No existe esa cuenta')
    res.redirect('/crear-cuenta')
    return next()
}
//si existe, confirmar suscripcion y redireccionar 
usuario.confirm = 1
await usuario.save()
req.flash('exito', 'La cuenta se a creado con exito')
res.redirect('/iniciar-sesion')
}


exports.formIniciarSesion =(req, res) =>{
    res.render('iniciar-sesion',{
        nombrePagina: "Iniciar Sesion"
    })
}
