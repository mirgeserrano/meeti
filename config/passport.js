const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Usuarios = require('../models/Usuario')

passport.use(new LocalStrategy({
      usernameField:'email',
      passwordField:'password',
   },
   
   async (email, password, next)=>{
    //codigo se ejecuta al llenar el formulario
     const usuario = await Usuarios.findOne({where :{email , confirm: true}})
   // revisar si existe o no
    if (!usuario) return next(null, false,{
    message:'No has Confirmado tu cuenta'
    }) 
  
  
    // si el usuaro existe comprobar el password

    const verficarpasword = usuario.validarPassword(password)
    console.log(verficarpasword);
    if(! verficarpasword)return next(null, false,{
    message:'Password Invalid'
     }) 

    return next (null, usuario);
   }

))

passport.serializeUser(function(usuario, cb){
    cb(null,usuario);
})

passport.deserializeUser(function(usuario, cb){
    cb(null,usuario);
})

module.exports = passport