module.exports = (sequelize, Sequelize) => {
    const PersonaPelicula = sequelize.define("persona_pelicula", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_persona: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_pelicula: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        rol: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return PersonaPelicula;
}