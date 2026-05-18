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

        <div>

            <h1>
                Gestión de Pagos
            </h1>

            <button
                onClick={() =>
                    navigate('/admin')
                }
            >

                Volver al Panel

            </button>

            <hr />


            {/* FORMULARIO */}

            <form onSubmit={handleSubmit}>


                {/* MONTO */}

                <input
                    type="number"
                    name="monto"
                    placeholder="Monto"
                    value={form.monto}
                    onChange={handleChange}
                    min="1"
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
                />

                <br /><br />


                {/* CLIENTE */}

                <select
                    name="id_cliente"
                    value={
                        form.id_cliente
                    }
                    onChange={handleChange}
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


                <button type="submit">

                    Registrar Pago

                </button>

            </form>


            <hr />


            {/* LISTA PAGOS */}

            <h2>
                Historial de Pagos
            </h2>


            {

                pagos.map((pago) => (

                    <div
                        key={pago.idPago}
                    >

                        <hr />

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