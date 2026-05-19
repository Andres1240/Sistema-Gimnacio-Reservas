import {

    useEffect,
    useState

} from 'react';

import { useNavigate }
from 'react-router-dom';

import axios from 'axios';

import {

    getPagos,
    createPago,
    deletePago

} from '../services/pago.service';


function GestionPagosPage() {

    // =========================
    // STATES
    // =========================

    const navigate =
    useNavigate();

    const [pagos, setPagos] =
    useState([]);

    const [clientes, setClientes] =
    useState([]);

    const [membresias, setMembresias] =
    useState([]);


    const [form, setForm] =
    useState({

        monto: '',
        metodo_pago: '',
        id_cliente: '',
        id_membresia: ''
    });


    // =========================
    // LOAD PAGOS
    // =========================

    const loadPagos =
    async () => {

        try {

            const data =
            await getPagos();

            setPagos(data);

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // LOAD CLIENTES
    // =========================

    const loadClientes =
    async () => {

        try {

            const token =
            localStorage.getItem('token');

            const response =
            await axios.get(

                'http://localhost:3000/api/clientes',

                {

                    headers: {

                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setClientes(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // LOAD MEMBRESÍAS
    // =========================

    const loadMembresias =
    async () => {

        try {

            const token =
            localStorage.getItem('token');

            const response =
            await axios.get(

                'http://localhost:3000/api/membresias',

                {

                    headers: {

                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setMembresias(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // USE EFFECT
    // =========================

    useEffect(() => {

        loadPagos();
        loadClientes();
        loadMembresias();

    }, []);


    // =========================
    // INPUTS
    // =========================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
            e.target.value
        });
    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit =
    async (e) => {

        e.preventDefault();


        // VALIDAR CAMPOS

        if (

            !form.monto ||
            !form.metodo_pago ||
            !form.id_cliente ||
            !form.id_membresia

        ) {

            alert(
                'Todos los campos son obligatorios'
            );

            return;
        }


        // VALIDAR MONTO

        if (

            Number(form.monto)
            <=
            0

        ) {

            alert(
                'Monto inválido'
            );

            return;
        }


        try {

            await createPago(form);

            alert(
                'Pago registrado correctamente'
            );

            loadPagos();


            setForm({

                monto: '',
                metodo_pago: '',
                id_cliente: '',
                id_membresia: ''
            });

        } catch (error) {

            alert(

                error.response?.data?.error
                || 'Error'
            );
        }
    };


    // =========================
    // DELETE
    // =========================

    const handleDelete =
    async (id) => {

        const confirmar =
        window.confirm(
            '¿Eliminar pago?'
        );

        if (!confirmar) {

            return;
        }


        try {

            await deletePago(id);

            alert(
                'Pago eliminado correctamente'
            );

            loadPagos();

        } catch (error) {

            alert(

                error.response?.data?.error
                || 'Error'
            );
        }
    };


    return (

        <div

            style={{

                minHeight: '100vh',

                backgroundColor:
                    'var(--light)',

                padding: '40px'
            }}
        >

            <h1

                className="
                    title-custom
                "

                style={{

                    textAlign: 'center',

                    marginBottom: '20px'
                }}
            >

                Gestión de Pagos

            </h1>


            <div
                style={{

                    display: 'flex',

                    justifyContent: 'center',

                    marginBottom: '30px'
                }}
            >

                <button

                    onClick={() =>
                        navigate('/admin')
                    }

                    className="
                        btn-custom
                    "
                >

                    Volver al Panel

                </button>

            </div>


            {/* ========================= */}
            {/* FORMULARIO */}
            {/* ========================= */}

            <form

                onSubmit={handleSubmit}

                className="
                    card-custom
                "

                style={{

                    maxWidth: '600px',

                    margin:
                        '0 auto'
                }}
            >


                {/* MONTO */}

                <input
                    type="number"
                    name="monto"
                    placeholder="Monto"
                    value={form.monto}
                    onChange={handleChange}
                    min="1"
                    className="
                        input-custom
                    "
                />

                <br /><br />


                {/* MÉTODO */}

                <input
                    type="text"
                    name="metodo_pago"
                    placeholder="Método de pago"
                    value={
                        form.metodo_pago
                    }
                    onChange={handleChange}
                    className="
                        input-custom
                    "
                />

                <br /><br />


                {/* CLIENTE */}

                <select
                    name="id_cliente"
                    value={
                        form.id_cliente
                    }
                    onChange={handleChange}
                    className="
                        input-custom
                    "
                >

                    <option value="">
                        Seleccione cliente
                    </option>

                    {

                        clientes.map(
                            (cliente) => (

                            <option
                                key={
                                    cliente.idCliente
                                }

                                value={
                                    cliente.idCliente
                                }
                            >

                                {
                                    cliente.nombres
                                }

                                {' '}

                                {
                                    cliente.apellidos
                                }

                            </option>
                        ))
                    }

                </select>

                <br /><br />


                {/* MEMBRESÍA */}

                <select
                    name="id_membresia"
                    value={
                        form.id_membresia
                    }
                    onChange={handleChange}
                    className="
                        input-custom
                    "
                >

                    <option value="">
                        Seleccione membresía
                    </option>

                    {

                        membresias.map(
                            (membresia) => (

                            <option
                                key={
                                    membresia.idMembresia
                                }

                                value={
                                    membresia.idMembresia
                                }
                            >

                                {
                                    membresia.tipo
                                }

                                {' - '}

                                {
                                    membresia.nombres
                                }

                            </option>
                        ))
                    }

                </select>

                <br /><br />


                <button

                    type="submit"

                    className="
                        btn-custom
                    "

                    style={{

                        width: '100%'
                    }}
                >

                    Registrar Pago

                </button>

            </form>


            {/* ========================= */}
            {/* LISTA PAGOS */}
            {/* ========================= */}

            <h2

                className="
                    title-custom
                "

                style={{

                    textAlign: 'center',

                    marginTop: '50px'
                }}
            >

                Historial de Pagos

            </h2>


            {

                pagos.map((pago) => (

                    <div

                        key={pago.idPago}

                        className="
                            card-custom
                        "

                        style={{

                            maxWidth: '700px',

                            margin:
                                '20px auto'
                        }}
                    >

                        <p>

                            <strong>
                                Cliente:
                            </strong>

                            {' '}

                            {
                                pago.nombres
                            }

                            {' '}

                            {
                                pago.apellidos
                            }

                        </p>

                        <p>

                            <strong>
                                Membresía:
                            </strong>

                            {' '}

                            {
                                pago.membresia
                            }

                        </p>

                        <p>

                            <strong>
                                Monto:
                            </strong>

                            {' '}

                            $
                            {pago.monto}

                        </p>

                        <p>

                            <strong>
                                Método:
                            </strong>

                            {' '}

                            {
                                pago.metodo_pago
                            }

                        </p>

                        <p>

                            <strong>
                                Fecha:
                            </strong>

                            {' '}

                            {
                                new Date(
                                    pago.fecha_pago
                                ).toLocaleString(
                                    'es-CO'
                                )
                            }

                        </p>


                        <button

                            onClick={() =>
                                handleDelete(
                                    pago.idPago
                                )
                            }

                            className="
                                btn-delete
                            "
                        >

                            Eliminar

                        </button>

                    </div>
                ))
            }

        </div>
    );
}

export default GestionPagosPage;