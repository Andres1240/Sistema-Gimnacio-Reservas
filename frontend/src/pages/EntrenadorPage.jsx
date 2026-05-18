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

        logout

    } = useContext(
        AuthContext
    );


    const handleLogout = () => {

        logout();

        navigate('/');
    };


    return (

        <div>

            <h1>
                Panel Entrenador
            </h1>

            <hr />


            {/* ========================= */}
            {/* MENÚ */}
            {/* ========================= */}

            <button
                onClick={() =>
                    navigate(
                        '/entrenador/clases'
                    )
                }
            >

                Mis Clases

            </button>

            <br /><br />

            <button
                onClick={() =>
                    navigate(
                        '/entrenador/asistencias'
                    )
                }
            >

                Registrar Asistencia

            </button>

            <br /><br />

            <button
                onClick={handleLogout}
            >

                Cerrar Sesión

            </button>

        </div>
    );
}

export default EntrenadorPage;