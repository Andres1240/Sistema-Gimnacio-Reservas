import {

    useContext

} from 'react';

import {

    useNavigate

} from 'react-router-dom';

import {

    AuthContext

} from '../context/AuthContext';


function EntrenadorPage() {

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

                    Panel Entrenador

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
            {/* MENÚ */}
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

                    Opciones Disponibles

                </h2>


                <div
                    className="
                        d-grid
                        gap-3
                    "
                >

                    {/* MIS CLASES */}

                    <button

                        onClick={() =>
                            navigate(
                                '/entrenador/clases'
                            )
                        }

                        className="
                            btn-custom
                        "
                    >

                        Mis Clases

                    </button>


                    {/* ASISTENCIAS */}

                    <button

                        onClick={() =>
                            navigate(
                                '/entrenador/asistencias'
                            )
                        }

                        className="
                            btn-custom
                        "
                    >

                        Registrar Asistencia

                    </button>

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

export default EntrenadorPage;