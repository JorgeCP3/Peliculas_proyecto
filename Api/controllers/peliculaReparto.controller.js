const db = require('../models'); 
const PeliculaReparto = db.PeliculaReparto;

exports.create = (req, res) => {
    const { pelicula_id, reparto_id, rol } = req.body;

    PeliculaReparto.create({ pelicula_id, reparto_id, rol })
        .then(data => {
            res.status(201).send(data); 
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear el reparto de la película." });
        });
};
