const passport = require("passport");

exports.autentificarUsuario=passport.authenticate('local',{
 successRedirect:'/administracion',
 failureRedirect:'/iniciar-sesion',
 failureFlash:true,
 badRequestMessage: 'ambos campo son obligatorio'
})

exports.usuarioAutenticado=(req, res,next)=>{
    if (req.isAuthenticated()) {
        return next();
        
    }
    return res.redirect('/iniciar-sesion');
}