const express = require('express');
const router = express.Router();

const claseController = require('../controllers/clase.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.get(
    '/',
    authMiddleware.verifyToken,
    claseController.getClases
);

router.get(
    '/:id',
    authMiddleware.verifyToken,
    claseController.getClaseById
);


router.post(
    '/',
    authMiddleware.verifyToken,
    claseController.createClase
);


router.put(
    '/:id',
    authMiddleware.verifyToken,
    claseController.updateClase
);

router.delete(
    '/:id',
    authMiddleware.verifyToken,
    claseController.deleteClase
);


module.exports = router;