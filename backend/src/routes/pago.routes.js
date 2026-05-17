const express = require('express');
const router = express.Router();

const pagoController =
    require('../controllers/pago.controller');

const authMiddleware =
    require('../middlewares/auth.middleware');

const roleMiddleware =
    require('../middlewares/role.middleware');

router.post(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    pagoController.createPago
);

router.get(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    pagoController.getPagos
);

router.get(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    pagoController.getPagoById
);

router.delete(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    pagoController.deletePago
);

module.exports = router;