const claseService = require('../services/clase.service');

const getClases = async (req, res) => {

    try {

        const clases = await claseService.getClases();

        res.status(200).json(clases);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const getClaseById = async (req, res) => {

    try {

        const clase = await claseService.getClaseById(
            req.params.id
        );

        res.status(200).json(clase);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const createClase = async (req, res) => {

    try {

        const result = await claseService.createClase(
            req.body,
            req.user
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const updateClase = async (req, res) => {

    try {

        const result = await claseService.updateClase(
            req.params.id,
            req.body
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const deleteClase = async (req, res) => {

    try {

        const result = await claseService.deleteClase(
            req.params.id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    getClases,
    getClaseById,
    createClase,
    updateClase,
    deleteClase
};