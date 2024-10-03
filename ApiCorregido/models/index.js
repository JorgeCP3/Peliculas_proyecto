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
db.personas = require("./persona.model.js")(sequelize, Sequelize);
db.peliculas = require("./pelicula.model.js")(sequelize, Sequelize);
db.persona_peliculas = require("./persona_pelicula.model.js")(sequelize, Sequelize);

db.personas.belongsToMany(db.peliculas, {
    through: db.persona_peliculas,
    foreignKey: "id_persona",
    otherKey: "id_pelicula"
});
db.peliculas.belongsToMany(db.personas, {
    through: db.persona_peliculas,
    foreignKey: "id_pelicula",
    otherKey: "id_persona"
});

module.exports = db;