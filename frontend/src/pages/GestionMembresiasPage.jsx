import {

    useEffect,
    useState

} from 'react';

import { useNavigate }
from 'react-router-dom';

import axios from 'axios';

import {

    getMembresias,
    createMembresia,
    updateMembresia,
    deleteMembresia

} from '../services/membresia.service';


function GestionMembresiasPage() {

    // =========================
    // STATES
    // =========================

    const navigate =
    useNavigate();

    const [membresias, setMembresias] =
        useState([]);

    const [clientes, setClientes] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);


    const [form, setForm] =
        useState({

            tipo: '',
            fecha_inicio: '',
            fecha_fin: '',
            id_estado_membresia: '',
            id_cliente: ''
        });


    // =========================
    // OBTENER MEMBRESÍAS
    // =========================

    const loadMembresias =
    async () => {

        try {

            const data =
            await getMembresias();

            setMembresias(data);

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // OBTENER CLIENTES
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
    // USE EFFECT
    // =========================

    useEffect(() => {

        loadMembresias();
        loadClientes();

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


        // VALIDACIONES

        if (

            !form.tipo ||
            !form.fecha_inicio ||
            !form.fecha_fin ||
            !form.id_estado_membresia ||
            !form.id_cliente

        ) {

            alert(
                'Todos los campos son obligatorios'
            );

            return;
        }


        if (

            new Date(form.fecha_fin)
            <=
            new Date(form.fecha_inicio)

        ) {

            alert(
                'La fecha final debe ser mayor'
            );

            return;
        }


        try {

            if (editingId) {

                await updateMembresia(

                    editingId,
                    form
                );

                alert(
                    'Membresía actualizada correctamente'
                );

            } else {

                await createMembresia(
                    form
                );

                alert(
                    'Membresía creada correctamente'
                );
            }


            loadMembresias();

            setEditingId(null);


            setForm({

                tipo: '',
                fecha_inicio: '',
                fecha_fin: '',
                id_estado_membresia: '',
                id_cliente: ''
            });

        } catch (error) {

            alert(

                error.response?.data?.error
                || 'Error'
            );
        }
    };


    // =========================
    // EDITAR
    // =========================

    const handleEdit = (
        membresia
    ) => {

        setEditingId(
            membresia.idMembresia
        );

        setForm({

            tipo:
                membresia.tipo,

            fecha_inicio:
                membresia.fecha_inicio
                ?.slice(0, 16),

            fecha_fin:
                membresia.fecha_fin
                ?.slice(0, 16),

            id_estado_membresia:
                membresia.id_estado_membresia,

            id_cliente:
                membresia.idCliente
        });
    };


    // =========================
    // ELIMINAR
    // =========================

    const handleDelete =
    async (id) => {

        const confirmar =
        window.confirm(
            '¿Eliminar membresía?'
        );

        if (!confirmar) {

            return;
        }

        try {

            await deleteMembresia(id);

            alert(
                'Membresía eliminada correctamente'
            );

            loadMembresias();

        } catch (error) {

            alert(

                error.response?.data?.error
                || 'Error al eliminar'
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

                    marginBottom: '30px'
                }}
            >

                Gestión de Membresías

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
                        '30px auto'
                }}
            >

                <input
                    type="text"
                    name="tipo"
                    placeholder="Tipo membresía"
                    value={form.tipo}
                    onChange={handleChange}
                    className="
                        input-custom
                    "
                />

                <br /><br />


                <input
                    type="datetime-local"
                    name="fecha_inicio"
                    value={form.fecha_inicio}
                    onChange={handleChange}
                    className="
                        input-custom
                    "
                />

                <br /><br />


                <input
                    type="datetime-local"
                    name="fecha_fin"
                    value={form.fecha_fin}
                    onChange={handleChange}
                    className="
                        input-custom
                    "
                />

                <br /><br />


                {/* ESTADO */}

                <select
                    name="id_estado_membresia"
                    value={
                        form.id_estado_membresia
                    }
                    onChange={handleChange}
                    className="
                        input-custom
                    "
                >

                    <option value="">
                        Seleccione estado
                    </option>

                    <option value="1">
                        Activa
                    </option>

                    <option value="2">
                        Vencida
                    </option>

                    <option value="3">
                        Cancelada
                    </option>

                </select>

                <br /><br />


                {/* CLIENTES */}

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


                <button

                    type="submit"

                    className="
                        btn-custom
                    "

                    style={{

                        width: '100%'
                    }}
                >

                    {

                        editingId

                        ?

                        'Actualizar Membresía'

                        :

                        'Crear Membresía'
                    }

                </button>

            </form>


            {/* ========================= */}
            {/* LISTA */}
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

                Membresías Registradas

            </h2>


            {

                membresias.map(
                    (membresia) => (

                    <div

                        key={
                            membresia.idMembresia
                        }

                        className="
                            card-custom
                        "

                        style={{

                            maxWidth: '700px',

                            margin:
                                '20px auto'
                        }}
                    >

                        <h3

                            style={{

                                color:
                                    'var(--primary-dark)'
                            }}
                        >

                            {membresia.tipo}

                        </h3>

                        <p>

                            <strong>
                                Cliente:
                            </strong>

                            {' '}

                            {
                                membresia.nombres
                            }

                            {' '}

                            {
                                membresia.apellidos
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

                        <p>

                            <strong>
                                Inicio:
                            </strong>

                            {' '}

                            {
                                new Date(
                                    membresia.fecha_inicio
                                ).toLocaleString(
                                    'es-CO'
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
                                    membresia.fecha_fin
                                ).toLocaleString(
                                    'es-CO'
                                )
                            }

                        </p>


                        <button

                            onClick={() =>
                                handleEdit(
                                    membresia
                                )
                            }

                            className="
                                btn-custom
                            "

                            style={{

                                marginRight: '10px'
                            }}
                        >

                            Editar

                        </button>


                        <button

                            onClick={() =>
                                handleDelete(
                                    membresia.idMembresia
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

export default GestionMembresiasPage;