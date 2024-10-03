module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define("persona", {
        nombre_completo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Persona;
}