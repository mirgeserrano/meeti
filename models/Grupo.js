const DataTypes = require("sequelize");
const db = require("../config/db.js");
const { v4: uuidv4 } = require('uuid');
const Categorias = require("./Categoria.js");
const Usuarios = require("./Usuario.js");


const Grupos = db.define("grupos",{
  
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull: false,
        defaultValue:uuidv4()

    },
    nombre:{
      type: DataTypes.STRING(100),
      allowNull: false,
      validate:{
      notEmpty:{
        msg:'El nombre no puede ir vacio'
    }
}
    },

descripcion:{
    type: DataTypes.STRING(),
      allowNull: false,
      validate:{
      notEmpty:{
        msg:'Debes colocar una Descripcion'
    }
}  },
url: DataTypes.STRING(),
imagen: DataTypes.STRING(),


});

//union de las tablas categoria y usuario
Grupos.belongsTo(Categorias)
Grupos.belongsTo(Usuarios)

module.exports= Grupos;