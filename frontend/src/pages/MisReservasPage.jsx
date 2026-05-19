import {

    useEffect,
    useState

} from 'react';

import {

    useNavigate

} from 'react-router-dom';

import {

    getMisReservas,
    deleteReserva

} from '../services/reserva.service';


function MisReservasPage() {

    const navigate =
        useNavigate();

    const [reservas,
        setReservas] =
        useState([]);


    // =========================
    // CARGAR RESERVAS
    // =========================

    const loadReservas =
    async () => {

        try {

            const data =
                await getMisReservas();

            setReservas(data);

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // USE EFFECT
    // =========================

    useEffect(() => {

        loadReservas();

    }, []);


    // =========================
    // CANCELAR RESERVA
    // =========================

    const handleDelete =
    async (id) => {

        const confirmar =
            window.confirm(
                '¿Cancelar reserva?'
            );

        if (!confirmar) {

            return;
        }

        try {

            await deleteReserva(id);

            alert(
                'Reserva cancelada correctamente'
            );

            loadReservas();

        } catch (error) {

            alert(

                error.response?.data?.error
                ||
                'Error al cancelar reserva'
            );
        }
    };


    return (

        <div
            style={{
                minHeight: '100vh',
                backgroundColor: 'var(--light)',
                padding: '40px'
            }}
        >

            <div
                className="card-custom"
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}
            >

                {/* HEADER */}

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '30px',
                        flexWrap: 'wrap',
                        gap: '15px'
                    }}
                >

                    <h1
                        className="title-custom"
                        style={{
                            margin: 0
                        }}
                    >
                        Mis Reservas
                    </h1>

                    <button
                        onClick={() =>
                            navigate('/cliente')
                        }

                        className="
                            btn-custom
                        "
                    >

                        Volver al Panel

                    </button>

                </div>


                {/* LISTADO */}

                {

                    reservas.length === 0

                    ?

                    <p
                        style={{
                            textAlign: 'center',
                            color: 'var(--primary)'
                        }}
                    >

                        No tienes reservas registradas

                    </p>

                    :

                    reservas.map((reserva) => (

                        <div
                            key={
                                reserva.idReserva
                            }

                            className="
                                card-custom
                            "

                            style={{
                                marginBottom: '20px',
                                border:
                                    '1px solid var(--secondary)'
                            }}
                        >

                            <h3
                                className="
                                    title-custom
                                "
                            >

                                {reserva.clase}

                            </h3>

                            <p>

                                <strong>
                                    Tipo:
                                </strong>

                                {' '}

                                {reserva.tipo}

                            </p>

                            <p>

                                <strong>
                                    Inicio:
                                </strong>

                                {' '}

                                {

                                    new Date(
                                        reserva.fecha_hora_inicio
                                    ).toLocaleString(
                                        'es-CO',
                                        {
                                            dateStyle:
                                                'short',

                                            timeStyle:
                                                'short'
                                        }
                                    )
                                }

                            </p>

                            <p>

                                <strong>
                                    Fin:
                                </strong>

                                {' '}

                                {

                                    new Date(
                                        reserva.fecha_hora_fin
                                    ).toLocaleString(
                                        'es-CO',
                                        {
                                            dateStyle:
                                                'short',

                                            timeStyle:
                                                'short'
                                        }
                                    )
                                }

                            </p>

                            <p>

                                <strong>
                                    Estado:
                                </strong>

                                {' '}

                                {
                                    reserva.estado_reserva
                                }

                            </p>

                            <p>

                                <strong>
                                    Entrenador:
                                </strong>

                                {' '}

                                {
                                    reserva.entrenador_nombre
                                }

                                {' '}

                                {
                                    reserva.entrenador_apellido
                                }

                            </p>


                            <button
                                onClick={() =>
                                    handleDelete(
                                        reserva.idReserva
                                    )
                                }

                                style={{
                                    backgroundColor:
                                        '#c0392b',

                                    color:
                                        'white',

                                    border:
                                        'none',

                                    padding:
                                        '10px 18px',

                                    borderRadius:
                                        '8px',

                                    cursor:
                                        'pointer',

                                    transition:
                                        '0.3s'
                                }}

                                onMouseOver={(e) =>
                                    e.target.style.backgroundColor =
                                    '#922b21'
                                }

                                onMouseOut={(e) =>
                                    e.target.style.backgroundColor =
                                    '#c0392b'
                                }
                            >

                                Cancelar Reserva

                            </button>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default MisReservasPage;