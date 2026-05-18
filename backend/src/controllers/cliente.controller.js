const clienteService =
require('./cliente.service');


// =========================
// GET CLIENTES
// =========================

const getClientes =
async (req, res) => {

    try {

        const clientes =
        await clienteService
        .getClientes();

        res.json(clientes);

    } catch (error) {

        res.status(500).json({

            error:
            error.message
        });
    }
};


// =========================
// GET CLIENTE BY ID
// =========================

const getClienteById =
async (req, res) => {

    try {

        const cliente =
        await clienteService
        .getClienteById(
            req.params.id
        );

        res.json(cliente);

    } catch (error) {

        res.status(404).json({

            error:
            error.message
        });
    }
};


module.exports = {

    getClientes,
    getClienteById
};