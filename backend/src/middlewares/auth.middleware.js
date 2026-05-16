const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    try {

        // Obtener header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: 'Token requerido'
            });
        }

        // Formato: Bearer TOKEN
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Token inválido'
            });
        }

        // Verificar token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardar datos usuario
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            error: 'Token inválido o expirado'
        });

    }
};

module.exports = {
    verifyToken
};