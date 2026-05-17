const asistenciaService = require('../services/asistencia.service');

const registrarAsistencia = async (req, res) => {

    try {

        const result =
            await asistenciaService.registrarAsistencia(
                req.body
            );

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

const getAsistentesByClase = async (req, res) => {

    try {

        const asistentes =
            await asistenciaService.getAsistentesByClase(
                req.params.idClase
            );

        res.status(200).json(asistentes);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const getMisAsistencias = async (req, res) => {

    try {

        const asistencias =
            await asistenciaService.getMisAsistencias(
                req.user
            );

        res.status(200).json(asistencias);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

module.exports = {
    registrarAsistencia,
    getAsistentesByClase,
    getMisAsistencias
};