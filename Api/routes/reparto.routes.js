module.exports = app => {
    const express = require('express');
const router = express.Router();
const repartoController = require('../controllers/reparto.controller');

router.get('/', repartoController.getListaReparto);
router.post('/', repartoController.crearReparto);
router.patch('/:id', repartoController.updateRepartoPatch);
router.put('/:id', repartoController.updateRepartoPut);
router.delete('/:id', repartoController.deleteReparto);
router.get('/:id', repartoController.getRepartoById);

app.use('/reparto', router);
}

