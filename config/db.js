const sequelize = require("sequelize");

module.exports = new sequelize('meeti','postgres','123456', {
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
//operatorsAliases: false,
//logging :false,
  }
);

