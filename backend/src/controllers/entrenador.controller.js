const entrenadorService = require('../services/entrenador.service');

const createEntrenador = async (req, res) => {

    try {

        const result = await entrenadorService.createEntrenador(
            req.body
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

const getEntrenadores = async (req, res) => {

    try {

        const entrenadores = await entrenadorService.getEntrenadores();

        res.status(200).json(entrenadores);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const getEntrenadorById = async (req, res) => {

    try {

        const entrenador = await entrenadorService.getEntrenadorById(
            req.params.id
        );

        res.status(200).json(entrenador);

    } catch (error) {

        res.status(404).json({
            error: error.message
        });

    }
};

module.exports = {
    createEntrenador,
    getEntrenadores,
    getEntrenadorById
};