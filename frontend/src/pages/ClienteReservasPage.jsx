import {

    useEffect,
    useState

} from 'react';

import {

    useNavigate

} from 'react-router-dom';

import {

    getClases

} from '../services/clase.service';

import {

    createReserva

} from '../services/reserva.service';


function ClienteReservasPage() {

    const navigate =
        useNavigate();

    const [clases,
        setClases] =
        useState([]);


    // =========================
    // CARGAR CLASES
    // =========================

    const loadClases =
    async () => {

        try {

            const data =
                await getClases();

            // Solo programadas
            const disponibles =
                data.filter(
                    (clase) =>
                        clase.estado_clase
                        ===
                        'Programada'
                );

            setClases(
                disponibles
            );

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // USE EFFECT
    // =========================

    useEffect(() => {

        loadClases();

    }, []);


    // =========================
    // RESERVAR
    // =========================

    const handleReserva =
    async (idClase) => {

        try {

            await createReserva({

                id_clase:
                    idClase,

                id_estado_reserva:
                    1
            });

            alert(
                'Reserva creada correctamente'
            );

            loadClases();

        } catch (error) {

            alert(

                error.response?.data?.error
                ||
                'Error al reservar'
            );
        }
    };


    return (

        <div>

            <button
                onClick={() =>
                    navigate(
                        '/cliente'
                    )
                }
            >

                Volver al Panel

            </button>

            <hr />

            <h1>
                Reservar Clases
            </h1>


            {

                clases.map((clase) => (

                    <div
                        key={
                            clase.idClase
                        }
                    >

                        <hr />

                        <h3>
                            {clase.nombre}
                        </h3>

                        <p>

                            <strong>
                                Tipo:
                            </strong>

                            {' '}

                            {clase.tipo}

                        </p>

                        <p>

                            <strong>
                                Inicio:
                            </strong>

                            {' '}

                            {

                                new Date(
                                    clase.fecha_hora_inicio
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
                                    clase.fecha_hora_fin
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
                                Cupos:
                            </strong>

                            {' '}

                            {
                                clase.cupo_disponible
                            }

                            /

                            {
                                clase.aforo
                            }

                        </p>

                        <p>

                            <strong>
                                Entrenador:
                            </strong>

                            {' '}

                            {
                                clase.entrenador_nombre
                            }

                            {' '}

                            {
                                clase.entrenador_apellido
                            }

                        </p>


                        <button
                            onClick={() =>
                                handleReserva(
                                    clase.idClase
                                )
                            }
                        >

                            Reservar

                        </button>

                    </div>
                ))
            }

        </div>
    );
}

export default ClienteReservasPage;