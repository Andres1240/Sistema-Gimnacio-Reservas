const express = require('express');
const router = express.Router();

const membresiaController = require('../controllers/membresia.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    membresiaController.createMembresia
);

router.get(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    membresiaController.getMembresias
);

router.get(
    '/mi-membresia',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('CLIENTE'),
    membresiaController.getMiMembresia
);

router.get(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    membresiaController.getMembresiaById
);


router.put(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    membresiaController.updateMembresia
);

router.delete(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    membresiaController.deleteMembresia
);

module.exports = router;