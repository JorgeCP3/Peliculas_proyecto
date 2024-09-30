const db = require('../models');
const Reparto = db.reparto;

exports.getListaReparto = async (req, res) => {
    try {
        const reparto = await Reparto.findAll();
        res.json(reparto);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearReparto = async (req, res) => {
    try {
        const { nombre, apellido } = req.body;
        await Reparto.create({ nombre, apellido });
        res.json({ message: 'Persona registrada' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateRepartoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const reparto = await Reparto.findByPk(id);
        if (!reparto) {
            return res.status(404).send('Persona no encontrada');
        }
        reparto.nombre = req.body.nombre || reparto.nombre;
        reparto.apellido = req.body.apellido || reparto.apellido;
        await reparto.save();
        res.json(reparto);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.updateRepartoPut = async (req, res) => {
    const id = req.params.id;
    try {
        const reparto = await Reparto.findByPk(id);
        if (!reparto) {
            return res.status(404).send('Persona no encontrada');
        }
        reparto.nombre = req.body.nombre;
        reparto.apellido = req.body.apellido;
        await reparto.save();
        res.json(reparto);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.deleteReparto = async (req, res) => {
    const id = req.params.id;
    try {
        const reparto = await Reparto.findByPk(id);
        if (!reparto) {
            return res.status(404).send('Persona no encontrada');
        }
        await reparto.destroy();
        res.json({ message: 'Persona eliminada' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.getRepartoById = async (req, res) => {
    const id = req.params.id;
    try {
        const reparto = await Reparto.findByPk(id);
        if (!reparto) {
            return res.status(404).send('Persona no encontrada');
        }
        res.json(reparto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la persona');
    }
}
