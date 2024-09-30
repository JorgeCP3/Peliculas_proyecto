const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pelicula = require("./pelicula.model.js")(sequelize, Sequelize);
db.reparto = require("./reparto.model.js")(sequelize, Sequelize);
db.peliculaReparto = require("./peliculaReparto.model.js")(sequelize, Sequelize);

// Definir las relaciones
db.pelicula.belongsToMany(db.reparto, {
    through: db.peliculaReparto,
    as: "reparto",
    foreignKey: "pelicula_id"
});
db.reparto.belongsToMany(db.pelicula, {
    through: db.peliculaReparto,
    as: "peliculas",
    foreignKey: "reparto_id"
});

module.exports = db;
