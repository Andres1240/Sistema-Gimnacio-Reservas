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
                Panel Cliente
            </h1>

            <hr />


            <button
                onClick={() =>
                    navigate(
                        '/cliente/reservas'
                    )
                }
            >

                Reservar Clases

            </button>

            <br /><br />


            <button
                onClick={() =>
                    navigate(
                        '/cliente/mis-reservas'
                    )
                }
            >

                Mis Reservas

            </button>

            <br /><br />


            <button
                onClick={() =>
                    navigate(
                        '/cliente/membresia'
                    )
                }
            >

                Mi Membresía

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

export default ClientePage;