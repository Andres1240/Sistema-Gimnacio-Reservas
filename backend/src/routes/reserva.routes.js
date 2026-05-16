const express = require('express');
const router = express.Router();

const reservaController = require('../controllers/reserva.controller');

router.post('/', reservaController.createReserva);

router.get('/', reservaController.getReservas);

router.delete('/:id', reservaController.deleteReserva);

module.exports = router;