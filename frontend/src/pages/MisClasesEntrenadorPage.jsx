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
                Mis Clases
            </h1>


            {

                clases.length === 0

                ?

                <p>
                    No tienes clases asignadas
                </p>

                :

                clases.map((clase) => (

                    <div
                        key={
                            clase.idClase
                        }
                    >

                        <hr />

                        <h2>
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

                            {
                                clase.estado_clase
                            }

                        </p>

                    </div>
                ))
            }

        </div>
    );
}

export default MisClasesEntrenadorPage;