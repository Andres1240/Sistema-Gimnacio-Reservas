import {

    useNavigate

} from 'react-router-dom';

import {

    useContext

} from 'react';

import {

    AuthContext

} from '../context/AuthContext';


function ClientePage() {

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

                    Panel Cliente

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

                    {/* RESERVAR CLASES */}

                    <button

                        onClick={() =>
                            navigate(
                                '/cliente/reservas'
                            )
                        }

                        className="
                            btn-custom
                        "
                    >

                        Reservar Clases

                    </button>


                    {/* MIS RESERVAS */}

                    <button

                        onClick={() =>
                            navigate(
                                '/cliente/mis-reservas'
                            )
                        }

                        className="
                            btn-custom
                        "
                    >

                        Mis Reservas

                    </button>


                    {/* MEMBRESIA */}

                    <button

                        onClick={() =>
                            navigate(
                                '/cliente/membresia'
                            )
                        }

                        className="
                            btn-custom
                        "
                    >

                        Mi Membresía

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

export default ClientePage;