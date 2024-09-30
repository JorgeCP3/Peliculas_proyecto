module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const peliculaRepartoController = require('../controllers/peliculaReparto.controller');

    // Definir la ruta para manejar la creación de un nuevo reparto
    router.post('/', peliculaRepartoController.create);
 
app.use('/api/peliculaReparto', router);
}