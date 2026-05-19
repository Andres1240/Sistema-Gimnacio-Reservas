const authService = require('../services/auth.service');

const register = async (req, res) => {

    try {

        const result = await authService.registerUser(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

const login = async (req, res) => {

    try {

        const { correo, contraseña } = req.body;

        const result = await authService.loginUser(
            correo,
            contraseña
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(401).json({
            error: error.message
        });

    }
};

const registerClientPublic = async (req, res) => {

    try {
        const result = await authService.registerClientPublic(req.body);

        res.status(201).json(result);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    registerClientPublic
};