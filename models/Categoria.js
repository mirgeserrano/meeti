const DataTypes = require("sequelize");
const db = require("../config/db.js");


const Categorias = db.define("categorias",{
  
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
    },


  });


module.exports= Categorias;