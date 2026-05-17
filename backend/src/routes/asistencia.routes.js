const express = require('express');
const router = express.Router();

const asistenciaController =
    require('../controllers/asistencia.controller');

const authMiddleware =
    require('../middlewares/auth.middleware');

const roleMiddleware =
    require('../middlewares/role.middleware');


// Registrar asistencia
router.post(
    '/',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('ENTRENADOR'),
    asistenciaController.registrarAsistencia
);

// Consultar asistentes por clase
router.get(
    '/clase/:idClase',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles(
        'ENTRENADOR',
        'ADMINISTRADOR'
    ),
    asistenciaController.getAsistentesByClase
);

// Historial cliente
router.get(
    '/mis-asistencias',
    authMiddleware.verifyToken,
    roleMiddleware.authorizeRoles('CLIENTE'),
    asistenciaController.getMisAsistencias
);

module.exports = router;