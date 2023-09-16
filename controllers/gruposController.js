const Categorias = require("../models/Categoria.js");
const Grupos = require("../models/Grupo.js");
const Usuarios = require("../models/Usuario.js");

exports.formNuevoGrupo = async (req, res) =>{
    const categorias = await Categorias.findAll();
    //console.log(categorias);
    
    res.render('nuevo-grupo', {
        nombrePagina: "Crear un nuevo grupo",
    categorias
    });

    }
exports.crearGrupo= async(req, res)=>{
    const grupo = req.body;
    //Almacena el usuario
    grupo.usuarioId= req.user.id
    

    console.log(grupo);
    try { 
        await Grupos.create(grupo)
        req.flash('exito', 'Se ha creado el grupo ')
        res.redirect('/administracion')
    } catch (error) {
        const errorSequelize= error.errors.map(err=>err.message)

        console.log(error);
        req.flash('error', errorSequelize)
        res.redirect('/nuevo-grupo')
    }

}


