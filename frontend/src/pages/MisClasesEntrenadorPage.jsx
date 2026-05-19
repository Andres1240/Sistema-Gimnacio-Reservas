import {

    useEffect,
    useState

} from 'react';

import {

    useNavigate

} from 'react-router-dom';

import {

    getMisClases

} from '../services/clase.service';


function MisClasesEntrenadorPage() {

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
                await getMisClases();

            setClases(data);

        } catch (error) {

            console.log(error);

            alert(

                error.response?.data?.error
                ||
                'Error al cargar clases'
            );
        }
    };


    // =========================
    // USE EFFECT
    // =========================

    useEffect(() => {

        loadClases();

    }, []);


    return (

        <div
            style={{

                minHeight: '100vh',
                backgroundColor: 'var(--light)',
                padding: '40px'
            }}
        >

            {/* HEADER */}

            <div
                style={{

                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}
            >

                <h1
                    className="title-custom"
                    style={{

                        margin: 0
                    }}
                >

                    Mis Clases

                </h1>

                <button
                    onClick={() =>
                        navigate(
                            '/entrenador'
                        )
                    }

                    className="
                        btn-custom
                    "
                >

                    Volver al Panel

                </button>

            </div>


            {

                clases.length === 0

                ?

                <div
                    className="
                        card-custom
                    "

                    style={{

                        textAlign: 'center'
                    }}
                >

                    <p>

                        No tienes clases asignadas

                    </p>

                </div>

                :

                <div
                    style={{

                        display: 'grid',

                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(320px, 1fr))',

                        gap: '20px'
                    }}
                >

                    {

                        clases.map((clase) => (

                            <div
                                key={
                                    clase.idClase
                                }

                                className="
                                    card-custom
                                "
                            >

                                <h2
                                    className="
                                        title-custom
                                    "

                                    style={{

                                        marginTop: 0
                                    }}
                                >

                                    {clase.nombre}

                                </h2>

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
                                                dateStyle: 'short',
                                                timeStyle: 'short'
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
                                                dateStyle: 'short',
                                                timeStyle: 'short'
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
                                        Estado:
                                    </strong>

                                    {' '}

                                    <span
                                        style={{

                                            color:
                                                clase.estado_clase ===
                                                'Programada'

                                                ?

                                                'green'

                                                :

                                                'red',

                                            fontWeight:
                                                'bold'
                                        }}
                                    >

                                        {
                                            clase.estado_clase
                                        }

                                    </span>

                                </p>

                            </div>
                        ))
                    }

                </div>
            }

        </div>
    );
}

export default MisClasesEntrenadorPage;