module.exports = (sequelize, Sequelize) => {
    const Reparto = sequelize.define('Reparto', {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Reparto;
}
