import {

    Link,
    useNavigate

} from 'react-router-dom';

import {

    useContext

} from 'react';

import {

    AuthContext

} from '../context/AuthContext';


function AdminPage() {

    const navigate =
        useNavigate();

    const {

        logout,
        user

    } = useContext(
        AuthContext
    );


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        logout();

        navigate('/');
    };


    return (

        <div
            className="
                container
                mt-5
            "
        >

            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <div
                className="
                    card-custom
                    mb-4
                "
            >

                <h1
                    className="
                        title-custom
                    "
                >

                    Panel Administrador

                </h1>

                <hr />

                <h3
                    style={{

                        color:
                            'var(--primary)'
                    }}
                >

                    Bienvenido,

                    {' '}

                    {user?.nombres}

                    {' '}

                    {user?.apellidos}

                </h3>

                <p>

                    Rol:
                    {' '}

                    <strong>

                        {user?.rol}

                    </strong>

                </p>

            </div>


            {/* ========================= */}
            {/* MODULOS */}
            {/* ========================= */}

            <div
                className="
                    card-custom
                "
            >

                <h2
                    className="
                        mb-4
                    "
                >

                    Módulos del Sistema

                </h2>


                <div
                    className="
                        d-grid
                        gap-3
                    "
                >

                    {/* CLASES */}

                    <Link
                        to="/admin/clases"

                        className="
                            btn-custom
                            text-center
                            text-decoration-none
                        "
                    >

                        Gestión de Clases

                    </Link>


                    {/* ENTRENADORES */}

                    <Link
                        to="/admin/entrenadores"

                        className="
                            btn-custom
                            text-center
                            text-decoration-none
                        "
                    >

                        Gestión de Entrenadores

                    </Link>


                    {/* MEMBRESIAS */}

                    <Link
                        to="/admin/membresias"

                        className="
                            btn-custom
                            text-center
                            text-decoration-none
                        "
                    >

                        Gestión de Membresías

                    </Link>


                    {/* PAGOS */}

                    <Link
                        to="/admin/pagos"

                        className="
                            btn-custom
                            text-center
                            text-decoration-none
                        "
                    >

                        Gestión de Pagos

                    </Link>

                </div>


                <hr />


                {/* LOGOUT */}

                <button
                    onClick={handleLogout}

                    className="
                        btn-custom
                        w-100
                    "
                >

                    Cerrar Sesión

                </button>

            </div>

        </div>
    );
}

export default AdminPage;