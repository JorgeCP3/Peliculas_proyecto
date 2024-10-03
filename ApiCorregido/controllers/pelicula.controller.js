const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");


exports.listPelicula = async (req, res) => {

    //order by rotten_tomatoes
        try {
            const peliculas = await db.peliculas.findAll({ order: [['rotten_tomatoes', 'DESC']] });
            res.json(peliculas);
        } catch (error) {
            sendError500(res, error);
        }
    }


exports.getPeliculaById = async (req, res) => {
    try {
        const id = req.params.id;
        const pelicula = await db.peliculas.findByPk(id);
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.createPelicula = async (req, res) => {

    const requiredFields = ['titulo', 'fecha_de_estreno', 'sinopsis', 'trailer', 'rotten_tomatoes'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const pelicula = {
            titulo: req.body.titulo,
            rotten_tomatoes: req.body.rotten_tomatoes,
            sinopsis: req.body.sinopsis,
            fecha_de_estreno: req.body.fecha_de_estreno,
            trailer: req.body.trailer
        }
        const peliculaCreada = await db.peliculas.create(pelicula);

        res.status(201).json(peliculaCreada);
    } catch (error) {
        sendError500(error);
    }
}

exports.updatePeliculaPut = async (req, res) => {
    try {
        const id = req.params.id;
        const pelicula = {
            titulo: req.body.titulo,
            rotten_tomatoes: req.body.rotten_tomatoes,
            sinopsis: req.body.sinopsis,
            fecha_de_estreno: req.body.fecha_de_estreno,
            trailer: req.body.trailer
        }
        const result = await db.peliculas.update(pelicula, { where: { id: id } });
        if (result == 1) {
            res.json({ message: "Pelicula actualizada" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.updatePeliculaPatch = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.peliculas.update(req.body, { where: { id: id } });
        if (result == 1) {
            res.json({ message: "Pelicula actualizada" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.deletePelicula = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.peliculas.destroy({ where: { id: id } });
        if (result == 1) {
            res.json({ message: "Pelicula eliminada" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

//upload image, save image public/images/peliculas
exports.uploadImage = async (req, res) => {
    try {
        const id = req.params.id;
        const pelicula = await db.peliculas.findByPk(id);
        if (!pelicula) {
            res.status(404).send();
            return;
        }
        if (!req.files) {
            res.status(400).send({ message: "No hay archivos" });
            return;
        }
        const file = req.files.image;
        const fileName = pelicula.id + '.jpg';
        file.mv(`public/images/peliculas/${fileName}`);
        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        sendError500(res, error);
    }
}