const db = require('../models');
const Pelicula = db.pelicula;
const PeliculaReparto = db.PeliculaReparto;
const path = require('path');
const fs = require('fs');

exports.getListaPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll();
        res.json(peliculas);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearPelicula = async (req, res) => {
    try {
        const { nombre, sinopsis, fecha_lanzamiento, calificacion_rotten_tomatoes, trailer_url } = req.body;
        await Pelicula.create({ nombre, sinopsis, fecha_lanzamiento, calificacion_rotten_tomatoes, trailer_url });
        res.json({ message: 'Película creada' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updatePeliculaPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).send('Película no encontrada');
        }
        pelicula.nombre = req.body.nombre || pelicula.nombre;
        pelicula.sinopsis = req.body.sinopsis || pelicula.sinopsis;
        pelicula.fecha_lanzamiento = req.body.fecha_lanzamiento || pelicula.fecha_lanzamiento;
        pelicula.calificacion_rotten_tomatoes = req.body.calificacion_rotten_tomatoes || pelicula.calificacion_rotten_tomatoes;
        pelicula.trailer_url = req.body.trailer_url || pelicula.trailer_url;
        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updatePeliculaPut = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).send('Película no encontrada');
        }
        pelicula.nombre = req.body.nombre;
        pelicula.sinopsis = req.body.sinopsis;
        pelicula.fecha_lanzamiento = req.body.fecha_lanzamiento;
        pelicula.calificacion_rotten_tomatoes = req.body.calificacion_rotten_tomatoes;
        pelicula.trailer_url = req.body.trailer_url;
        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.eliminarPelicula = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await Pelicula.destroy({ where: { id } });
        if (!resultado) {
            return res.status(404).send('Película no encontrada');
        }
        res.json({ message: 'Película eliminada' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getPeliculaPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).send('Película no encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la película');
    }
};

exports.getReparto = (req, res) => {
    const { id } = req.params;

    PeliculaReparto.findAll({
        where: { pelicula_id: id },
        include: [
            {
                model: db.Reparto,
                attributes: ['id', 'nombre', 'apellido'] 
            }
        ]
    })
        .then(reparto => {
            if (reparto.length === 0) {
                return res.status(404).send({ message: 'No se encontró reparto para esta película.' });
            }
            res.status(200).send(reparto);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener el reparto." });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    Pelicula.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener la película." });
        });
}

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res); 
        if (!pelicula) {
            return;
        }
        if (!req.files) {
            return res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
        }
        const file = req.files.fotoPelicula; 
        const fileName = pelicula.id + '.jpg';
        file.mv(`public/images/peliculas/${fileName}`); 
        await pelicula.save(); 
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error.message
        });
    }
};

async function getPeliculaOr404(id, res) {
    const pelicula = await db.Peliculas.findByPk(id); 
    if (!pelicula) {
        res.status(404).json({
            msg: 'Película no encontrada'
        });
        return;
    }
    return pelicula;
}

exports.getPeliculasPorCalificacion = async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll({
            order: [
                ['calificacion_rotten_tomatoes', 'DESC']
            ]
        });
        res.json(peliculas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
