const membresiaService = require('../services/membresia.service');

const createMembresia = async (req, res) => {

    try {

        const result = await membresiaService.createMembresia(
            req.body
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

const getMembresias = async (req, res) => {

    try {

        const membresias = await membresiaService.getMembresias();

        res.status(200).json(membresias);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const getMembresiaById = async (req, res) => {

    try {

        const membresia = await membresiaService.getMembresiaById(
            req.params.id
        );

        res.status(200).json(membresia);

    } catch (error) {

        res.status(404).json({
            error: error.message
        });

    }
};

const updateMembresia = async (req, res) => {

    try {

        const result = await membresiaService.updateMembresia(
            req.params.id,
            req.body
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

const deleteMembresia = async (req, res) => {

    try {

        const result = await membresiaService.deleteMembresia(
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
    createMembresia,
    getMembresias,
    getMembresiaById,
    updateMembresia,
    deleteMembresia
};