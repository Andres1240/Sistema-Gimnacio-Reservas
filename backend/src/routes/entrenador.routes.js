const express = require('express');
const router = express.Router();

const entrenadorController = require('../controllers/entrenador.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    entrenadorController.createEntrenador
);

router.get(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    entrenadorController.getEntrenadores
);

router.get(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    entrenadorController.getEntrenadorById
);

router.put(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    entrenadorController.updateEntrenador
);

router.delete(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    entrenadorController.deleteEntrenador
);

module.exports = router;