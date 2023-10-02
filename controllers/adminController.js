const Grupos = require("../models/Grupo.js");

exports.panelAdminitracion=async(req, res)=>{
    const grupos = await Grupos.findAll({where: {usuarioId : req.user.id}})

    res.render('administracion', {
        nombrePagina: "Panel Adminitracion",
        grupos
    });

}