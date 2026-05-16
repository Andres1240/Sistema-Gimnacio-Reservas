const authorizeRoles = (...rolesPermitidos) => {

    return (req, res, next) => {

        try {

            const userRole = req.user.rol;

            if (!rolesPermitidos.includes(userRole)) {

                return res.status(403).json({
                    error: 'No tienes permisos para esta acción'
                });

            }

            next();

        } catch (error) {

            return res.status(500).json({
                error: error.message
            });

        }

    };

};

module.exports = {
    authorizeRoles
};