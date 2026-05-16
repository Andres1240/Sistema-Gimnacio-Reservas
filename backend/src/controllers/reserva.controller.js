const reservaService = require('../services/reserva.service');

const createReserva = async (req, res) => {

    try {

        const result = await reservaService.createReserva(
            req.body,
            req.user
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

const getReservas = async (req, res) => {

    try {

        const reservas = await reservaService.getReservas();

        res.status(200).json(reservas);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const getMisReservas = async (req, res) => {

    try {

        const reservas = await reservaService.getMisReservas(
            req.user
        );

        res.status(200).json(reservas);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const deleteReserva = async (req, res) => {

    try {

        const result = await reservaService.deleteReserva(
            req.params.id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

module.exports = {
    createReserva,
    getReservas,
    getMisReservas,
    deleteReserva
};