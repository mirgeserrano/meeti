const DataTypes = require("sequelize");
const db = require("../config/db.js");
const bcrypt = require('bcrypt');

const Usuarios = db.define("usuarios",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: DataTypes.STRING,

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        isEmail: { msg:'Agregar un correo válido'},
        //unique:{ msg : 'Usuario ya registrado'},
      },

    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
            msg:'El password no puede ir vacio'
        }
      }
    },

    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN,

  },
  {
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
  }
);

//Metodo que verifica un passaword
Usuarios.prototype.validarPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}
// Usuarios.prototype.hashPassword = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null );
// }


module.exports=Usuarios;