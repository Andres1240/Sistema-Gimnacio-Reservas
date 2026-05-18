import {

    useEffect,
    useState

} from 'react';

import {

    useNavigate

} from 'react-router-dom';

import {

    getMiMembresia

} from '../services/membresia.service';


function MiMembresiaPage() {

    const navigate =
        useNavigate();

    const [membresia,
        setMembresia] =
        useState(null);


    // =========================
    // CARGAR MEMBRESÍA
    // =========================

    const loadMembresia =
    async () => {

        try {

            const data =
                await getMiMembresia();

            setMembresia(data);

        } catch (error) {

            console.log(error);

            alert(

                error.response?.data?.error
                ||
                'Error al cargar membresía'
            );
        }
    };


    // =========================
    // USE EFFECT
    // =========================

    useEffect(() => {

        loadMembresia();

    }, []);


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
                Mi Membresía
            </h1>


            {

                membresia
                ?

                <div>

                    <h2>
                        {membresia.tipo}
                    </h2>

                    <p>

                        <strong>
                            Fecha inicio:
                        </strong>

                        {' '}

                        {

                            new Date(
                                membresia.fecha_inicio
                            ).toLocaleDateString(
                                'es-CO'
                            )
                        }

                    </p>

                    <p>

                        <strong>
                            Fecha fin:
                        </strong>

                        {' '}

                        {

                            new Date(
                                membresia.fecha_fin
                            ).toLocaleDateString(
                                'es-CO'
                            )
                        }

                    </p>

                    <p>

                        <strong>
                            Estado:
                        </strong>

                        {' '}

                        {
                            membresia.estado_membresia
                        }

                    </p>

                </div>

                :

                <p>
                    No tienes membresía registrada
                </p>
            }

        </div>
    );
}

export default MiMembresiaPage;