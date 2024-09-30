module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const peliculaController = require('../controllers/pelicula.controller');

    router.get('/', peliculaController.getListaPeliculas);
    router.post('/', peliculaController.crearPelicula);
    router.get('/:id', peliculaController.getPeliculaPorId);
    router.patch('/:id', peliculaController.updatePeliculaPatch);
    router.put('/:id', peliculaController.updatePeliculaPut);
    router.delete('/:id', peliculaController.eliminarPelicula);

    router.get('/:id', peliculaController.findOne);
    router.get('/:id/reparto', peliculaController.getReparto);
    
    router.post('/:id/foto', peliculaController.uploadPicture);
    router.get('/calificacion', peliculaController.getPeliculasPorCalificacion);

    app.use('/peliculas', router); 
}

