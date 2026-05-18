import { useNavigate }
from 'react-router-dom';

function ClientePage() {

    const navigate =
        useNavigate();

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

        </div>
    );
}

export default ClientePage;