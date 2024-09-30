module.exports = (sequelize, Sequelize) => {
    const PeliculaReparto = sequelize.define('PeliculaReparto', {
        pelicula_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Peliculas',
                key: 'id'
            },
            allowNull: false
        },
        reparto_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Repartos',
                key: 'id'
            },
            allowNull: false
        },
        rol: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        tableName: 'pelicula_reparto',
        timestamps: true
    });

    PeliculaReparto.associate = (models) => {
        PeliculaReparto.belongsTo(models.Pelicula, { foreignKey: 'pelicula_id' });
        PeliculaReparto.belongsTo(models.Reparto, { foreignKey: 'reparto_id' });
    };

    return PeliculaReparto;
};
