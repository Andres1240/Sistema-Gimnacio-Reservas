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

        <div>

            <button
                onClick={() =>
                    navigate('/cliente')
                }
            >

                Volver al Panel

            </button>

            <hr />

            <h1>
                Mis Reservas
            </h1>


            {

                reservas.map((reserva) => (

                    <div
                        key={
                            reserva.idReserva
                        }
                    >

                        <hr />

                        <h3>
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
                        >

                            Cancelar Reserva

                        </button>

                    </div>
                ))
            }

        </div>
    );
}

export default MisReservasPage;