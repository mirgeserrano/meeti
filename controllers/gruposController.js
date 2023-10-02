const multer = require("multer");
const Categorias = require("../models/Categoria.js");
const Grupos = require("../models/Grupo.js");
const Usuarios = require("../models/Usuario.js");
const shortid = require("shortid");

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../public/uploads/grupos/')
        },
        filename: (req, file, next)=> {
            const extension = file.mimetype.split('/')[1]
            next(null,`${shortid.generate()}.${extension}`)
        }
    }),
    limits: {
        fileSize: 300000  // Límite de tamaño a 100,000 bytes (100 KB)
    }
};

const upload = multer(configuracionMulter).single('imagen')

//Suber Imagen al servidor
exports.subirImagen= (req, res, next)=>{

    upload(req,res,function(error){
        if (error) {
             // Manejar errores de tamaño de archivo aquí
                if (error instanceof multer.MulterError) {
                     if (error.code === 'LIMIT_FILE_SIZE') {
                            req.flash('error','El archivo es muy grande')
                            }else{
                             req.flash('error',error.message)
                            }
                        }else if(error.hasOwnProperty('message')){
                            req.flash('error', error.message);
                        }
              res.redirect('back')
            return
        }else{
            next();
        }
    }),
    
    // no funciona 
    fileFilter=(req, file, next)=> {
        if(file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png'){
           next(null, true)
        } else {
           next(new Error('Formato no valido'), false)
        }
    }
 
}


exports.formNuevoGrupo = async (req, res) =>{
    const categorias = await Categorias.findAll();
    //console.log(categorias);
    
    res.render('nuevo-grupo', {
        nombrePagina: "Crear un nuevo grupo",
    categorias
    });

}



exports.crearGrupo= async(req, res)=>{
    //sanitizar buscar
    //req.sanitizeBody('nombre')
    //req.sanitizeBody('url')
    
    const grupo = req.body;
    //Almacena el usuario COMO EL CREADOR DEL GRUPO
    grupo.usuarioId= req.user.id
    //leer la imagen
    if (req.file) {
        
        grupo.imagen = req.file.filename;
    }
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


exports.formEditarGrupo=async(req, res)=>{
    //te etrae toda la informacion de un solo grupo

    const consulta =[]
    consulta.push( Grupos.findByPk(req.params.grupoId))
    consulta.push( Categorias.findAll())
    
    //promise con await, multiples consulta
   const[ grupo, categorias]= await Promise.all(consulta);

console.log(grupo);
res.render('editar-grupo', {
    grupo,
    nombrePagina: `Editar Grupo: ${grupo.nombre}`,
    categorias
});

} 