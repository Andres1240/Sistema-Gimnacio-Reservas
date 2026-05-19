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

import {

    getAsistentesByClase,
    registrarAsistencia

} from '../services/asistencia.service';


function AsistenciasEntrenadorPage() {

    const navigate =
        useNavigate();

    const [clases,
        setClases] =
        useState([]);

    const [idClase,
        setIdClase] =
        useState('');

    const [asistentes,
        setAsistentes] =
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
        }
    };


    // =========================
    // CARGAR ASISTENTES
    // =========================

    const loadAsistentes =
    async (claseId) => {

        try {

            const data =
            await getAsistentesByClase(
                claseId
            );

            setAsistentes(data);

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
    // CAMBIAR CLASE
    // =========================

    const handleClaseChange =
    async (e) => {

        const claseId =
            e.target.value;

        setIdClase(claseId);

        if (claseId) {

            loadAsistentes(claseId);
        }
    };


    // =========================
    // REGISTRAR ASISTENCIA
    // =========================

    const handleAsistencia =
    async (
        idCliente,
        estado
    ) => {

        try {

            await registrarAsistencia({

                id_cliente:
                    idCliente,

                id_clase:
                    idClase,

                id_estado_asistencia:
                    estado
            });

            alert(
                'Asistencia registrada'
            );

            loadAsistentes(idClase);

        } catch (error) {

            alert(

                error.response?.data?.error
                ||
                'Error al registrar'
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
                        Registrar Asistencia
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


                {/* SELECT CLASE */}

                <div
                    style={{
                        marginBottom: '30px'
                    }}
                >

                    <label
                        style={{
                            fontWeight: 'bold',
                            display: 'block',
                            marginBottom: '10px'
                        }}
                    >

                        Seleccione una clase

                    </label>

                    <select
                        value={idClase}
                        onChange={
                            handleClaseChange
                        }
                        className="
                            input-custom
                        "
                    >

                        <option value="">
                            Seleccione clase
                        </option>

                        {

                            clases.map((clase) => (

                                <option
                                    key={
                                        clase.idClase
                                    }

                                    value={
                                        clase.idClase
                                    }
                                >

                                    {
                                        clase.nombre
                                    }

                                </option>
                            ))
                        }

                    </select>

                </div>


                {/* LISTADO */}

                {

                    asistentes.length === 0
                    && idClase && (

                        <p
                            style={{
                                textAlign: 'center',
                                color: 'var(--primary)'
                            }}
                        >

                            No hay asistentes registrados

                        </p>
                    )
                }

                {

                    asistentes.map(
                        (asistente) => (

                            <div
                                key={
                                    asistente.idCliente
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

                                    {
                                        asistente.nombres
                                    }

                                    {' '}

                                    {
                                        asistente.apellidos
                                    }

                                </h3>


                                {

                                    asistente.estado_asistencia

                                    ?

                                    <p>

                                        <strong>
                                            Estado:
                                        </strong>

                                        {' '}

                                        <span
                                            style={{
                                                color:
                                                    'var(--accent)',
                                                fontWeight:
                                                    'bold'
                                            }}
                                        >

                                            {
                                                asistente.estado_asistencia
                                            }

                                        </span>

                                    </p>

                                    :

                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '10px',
                                            flexWrap: 'wrap',
                                            marginTop: '15px'
                                        }}
                                    >

                                        <button
                                            onClick={() =>
                                                handleAsistencia(
                                                    asistente.idCliente,
                                                    1
                                                )
                                            }

                                            className="
                                                btn-custom
                                            "
                                        >

                                            Asistió

                                        </button>

                                        <button
                                            onClick={() =>
                                                handleAsistencia(
                                                    asistente.idCliente,
                                                    2
                                                )
                                            }

                                            className="
                                                btn-custom
                                            "

                                            style={{
                                                backgroundColor:
                                                    '#c0392b'
                                            }}
                                        >

                                            Ausente

                                        </button>

                                        <button
                                            onClick={() =>
                                                handleAsistencia(
                                                    asistente.idCliente,
                                                    3
                                                )
                                            }

                                            className="
                                                btn-custom
                                            "

                                            style={{
                                                backgroundColor:
                                                    'var(--accent)'
                                            }}
                                        >

                                            Justificado

                                        </button>

                                    </div>
                                }

                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}

export default AsistenciasEntrenadorPage;