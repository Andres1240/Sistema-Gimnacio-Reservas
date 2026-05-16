const express = require('express');
const router = express.Router();

const claseController = require('../controllers/clase.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');


router.get(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles(
        'ADMIN',
        'CLIENTE',
        'ENTRENADOR'
    ),
    claseController.getClases
);

router.get(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles(
        'ADMIN',
        'CLIENTE',
        'ENTRENADOR'
    ),
    claseController.getClaseById
);


router.post(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMIN'),
    claseController.createClase
);


router.put(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMIN'),
    claseController.updateClase
);

router.delete(
    '/:id',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ADMIN'),
    claseController.deleteClase
);


module.exports = router;