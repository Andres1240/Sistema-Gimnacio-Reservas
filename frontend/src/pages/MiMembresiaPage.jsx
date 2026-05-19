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
                    maxWidth: '800px',
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
                        Mi Membresía
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


                {

                    membresia
                    ?

                    <div
                        className="
                            card-custom
                        "

                        style={{
                            border:
                                '1px solid var(--secondary)'
                        }}
                    >

                        <h2
                            className="
                                title-custom
                            "

                            style={{
                                marginBottom: '20px'
                            }}
                        >

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

                            <span
                                style={{

                                    backgroundColor:

                                        membresia.estado_membresia
                                        ===
                                        'Activa'

                                        ?

                                        '#27ae60'

                                        :

                                        '#c0392b',

                                    color:
                                        'white',

                                    padding:
                                        '6px 12px',

                                    borderRadius:
                                        '20px',

                                    fontSize:
                                        '14px'
                                }}
                            >

                                {
                                    membresia.estado_membresia
                                }

                            </span>

                        </p>

                    </div>

                    :

                    <div
                        className="
                            card-custom
                        "

                        style={{
                            textAlign: 'center'
                        }}
                    >

                        <p
                            style={{
                                color:
                                    'var(--primary)',
                                fontSize:
                                    '18px'
                            }}
                        >

                            No tienes membresía registrada

                        </p>

                    </div>
                }

            </div>

        </div>
    );
}

export default MiMembresiaPage;