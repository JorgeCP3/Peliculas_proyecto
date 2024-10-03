const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listPersona = async (req, res) => {
    try {
        const personas = await db.personas.findAll();
        res.json(personas);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.getPersonaById = async (req, res) => {
    try {
        const id = req.params.id;
        const persona = await db.personas.findByPk(id);
        if (persona) {
            res.json(persona);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.createPersona = async (req, res) => {
    const requiredFields = ['nombre_completo'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const persona = {
            nombre_completo: req.body.nombre_completo
        }
        const personaCreada = await db.personas.create(persona);

        res.status(201).json(personaCreada);
    } catch (error) {
        sendError500(error);
    }
}

exports.updatePersonaPut = async (req, res) => {
    try {
        const id = req.params.id;
        const persona = {
            nombre_completo: req.body.nombre_completo
        }
        const result = await db.personas.update(persona, { where: { id: id } });
        if (result == 1) {
            res.json({ message: "Persona actualizada" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.updatePersonaPatch = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.personas.update(req.body, { where: { id: id } });
        if (result == 1) {
            res.json({ message: "Persona actualizada" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

exports.deletePersona = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.personas.destroy({ where: { id: id } });
        if (result == 1) {
            res.json({ message: "Persona eliminada" });
        } else {
            res.status(404).send();
        }
    } catch (error) {
        sendError500(res, error);
    }
}

//upload image, save image public/images/personas
exports.uploadImage = async (req, res) => {
    try {
        const id = req.params.id;
        const persona = await db.personas.findByPk(id);
        if (!persona) {
            res.status(404).send();
            return;
        }
        if (!req.files) {
            res.status(400).send({ message: "No se ha subido ninguna imagen" });
            return;
        }
        const file = req.files.image;
        const fileName = persona.id + '.jpg';
        file.mv(`public/images/personas/${fileName}`);
        await persona.save();
        res.json(persona);
    } catch (error) {
        sendError500(res, error);
    }
}
