const express = require('express');
const router = express.Router();


const clienteController =
require('../controllers/cliente.controller');

const authMiddleware =
    require('../middlewares/auth.middleware');

const roleMiddleware =
    require('../middlewares/role.middleware');


// =========================
// GET CLIENTES
// =========================

router.get(
    '/',

    authMiddleware.verifyToken,

    roleMiddleware.authorizeRoles(
        'ADMINISTRADOR'
    ),

    clienteController.getClientes
);


// =========================
// GET CLIENTE BY ID
// =========================

router.get(
    '/:id',

    authMiddleware.verifyToken,

    roleMiddleware.authorizeRoles(
        'ADMINISTRADOR'
    ),

    clienteController.getClienteById
);


module.exports = router;