module.exports = (sequelize, Sequelize) => {
  const Pelicula = sequelize.define('Pelicula', {
      nombre: {
          type: Sequelize.STRING,
          allowNull: false
      },
      sinopsis: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      fecha_lanzamiento: {
          type: Sequelize.DATE,
          allowNull: false
      },
      calificacion_rotten_tomatoes: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      trailer_url: {
          type: Sequelize.STRING,
          allowNull: false
      }
  });
  
  return Pelicula;
}
