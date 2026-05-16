const express = require('express');
const router = express.Router();

const reservaController = require('../controllers/reserva.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('CLIENTE'),
    reservaController.createReserva
);

router.delete(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('CLIENTE'),
    reservaController.deleteReserva
);

router.get(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMIN'),
    reservaController.getReservas
);

router.get(
    '/mis-reservas',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('CLIENTE'),
    reservaController.getMisReservas
);


module.exports = router;