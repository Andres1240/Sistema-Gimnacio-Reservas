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
                        Reservar Clases
                    </h1>

                    <button
                        onClick={() =>
                            navigate(
                                '/cliente'
                            )
                        }
                        className="
                            btn-custom
                        "
                    >

                        Volver al Panel

                    </button>

                </div>


                {/* LISTADO CLASES */}

                {

                    clases.length === 0

                    ?

                    <p
                        style={{
                            textAlign: 'center',
                            color: 'var(--primary)'
                        }}
                    >

                        No hay clases disponibles

                    </p>

                    :

                    clases.map((clase) => (

                        <div
                            key={
                                clase.idClase
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

                                className="
                                    btn-custom
                                "
                            >

                                Reservar

                            </button>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default ClienteReservasPage;