module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define("pelicula", {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rotten_tomatoes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sinopsis: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        fecha_de_estreno: {
            type: Sequelize.DATE,
            allowNull: false
        },
        trailer: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Pelicula;
}