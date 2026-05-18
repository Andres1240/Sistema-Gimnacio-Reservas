const express =
require('express');

const router =
express.Router();

const clienteController =
require('./cliente.controller');

const authMiddleware =
require('../../middlewares/auth.middleware');

const roleMiddleware =
require('../../middlewares/role.middleware');


// =========================
// GET CLIENTES
// =========================

router.get(
    '/',

    authMiddleware.verifyToken,

    roleMiddleware.verifyRole(
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

    roleMiddleware.verifyRole(
        'ADMINISTRADOR'
    ),

    clienteController.getClienteById
);


module.exports = router;