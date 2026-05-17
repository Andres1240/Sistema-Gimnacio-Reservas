const pagoService = require('../services/pago.service');

const createPago = async (req, res) => {

    try {

        const result = await pagoService.createPago(
            req.body
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

const getPagos = async (req, res) => {

    try {

        const pagos = await pagoService.getPagos();

        res.status(200).json(pagos);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const getPagoById = async (req, res) => {

    try {

        const pago = await pagoService.getPagoById(
            req.params.id
        );

        res.status(200).json(pago);

    } catch (error) {

        res.status(404).json({
            error: error.message
        });

    }
};

const deletePago = async (req, res) => {

    try {

        const result = await pagoService.deletePago(
            req.params.id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            error: error.message
        });

    }
};

module.exports = {
    createPago,
    getPagos,
    getPagoById,
    deletePago
};