import { Navigate }
from 'react-router-dom';

function ProtectedRoute({

    children,
    user,
    allowedRoles

}) {

    // No logeado
    if (!user) {

        return <Navigate to="/" />;
    }

    // Rol no permitido
    if (
        !allowedRoles.includes(user.rol)
    ) {

        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;