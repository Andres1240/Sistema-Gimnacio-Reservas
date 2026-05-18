const express = require('express');
const router = express.Router();

const claseController = require('../controllers/clase.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');


router.get(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles(
        'ADMINISTRADOR',
        'CLIENTE',
        'ENTRENADOR'
    ),
    claseController.getClases
);

router.get(
    '/mis-clases',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles(
        'ENTRENADOR'
    ),
    claseController.getMisClases
);

router.get(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles(
        'ADMINISTRADOR',
        'CLIENTE',
        'ENTRENADOR'
    ),
    claseController.getClaseById
);


router.post(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    claseController.createClase
);


router.put(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    claseController.updateClase
);

router.delete(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMINISTRADOR'),
    claseController.deleteClase
);


module.exports = router;