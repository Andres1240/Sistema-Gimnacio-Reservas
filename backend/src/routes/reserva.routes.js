const express = require('express');
const router = express.Router();

const reservaController = require('../controllers/reserva.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/',
    authMiddleware.verifyToken,
    reservaController.createReserva
);

router.delete(
    '/:id',
    authMiddleware.verifyToken,
    reservaController.deleteReserva
);

router.get(
    '/',
    authMiddleware.verifyToken,
    reservaController.getReservas
);


module.exports = router;