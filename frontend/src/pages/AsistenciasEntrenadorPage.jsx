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

        <div>

            <button
                onClick={() =>
                    navigate(
                        '/entrenador'
                    )
                }
            >

                Volver al Panel

            </button>

            <hr />

            <h1>
                Registrar Asistencia
            </h1>


            {/* ========================= */}
            {/* SELECT CLASE */}
            {/* ========================= */}

            <select
                value={idClase}
                onChange={
                    handleClaseChange
                }
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


            <hr />


            {/* ========================= */}
            {/* LISTADO */}
            {/* ========================= */}

            {

                asistentes.map(
                    (asistente) => (

                        <div
                            key={
                                asistente.idCliente
                            }
                        >

                            <hr />

                            <h3>

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

                                    {
                                        asistente.estado_asistencia
                                    }

                                </p>

                                :

                                <div>

                                    <button
                                        onClick={() =>
                                            handleAsistencia(
                                                asistente.idCliente,
                                                1
                                            )
                                        }
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
    );
}

export default AsistenciasEntrenadorPage;