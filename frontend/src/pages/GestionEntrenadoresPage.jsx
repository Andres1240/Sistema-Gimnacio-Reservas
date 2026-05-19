import {

    useEffect,
    useState

} from 'react';

import {

    useNavigate

} from 'react-router-dom';

import {

    getEntrenadores,
    createEntrenador,
    updateEntrenador,
    deleteEntrenador

} from '../services/entrenador.service';


function GestionEntrenadoresPage() {

    const navigate =
    useNavigate();

    const [entrenadores, setEntrenadores] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [form, setForm] = useState({

        nombres: '',
        apellidos: '',
        correo: '',
        contraseña: '',
        experiencia: '',
        especialidad: '',
        id_estado_entrenador: ''
    });


    // =========================
    // CARGAR ENTRENADORES
    // =========================

    const loadEntrenadores =
    async () => {

        try {

            const data =
            await getEntrenadores();

            setEntrenadores(data);

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        loadEntrenadores();

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


        if (
            !form.nombres ||
            !form.apellidos ||
            !form.correo ||
            !form.experiencia ||
            !form.especialidad ||
            !form.id_estado_entrenador
        ) {

            alert(
                'Todos los campos son obligatorios'
            );

            return;
        }


        if (
            form.experiencia < 0
        ) {

            alert(
                'La experiencia no puede ser negativa'
            );

            return;
        }


        try {

            if (editingId) {

                await updateEntrenador(

                    editingId,
                    form
                );

                alert(
                    'Entrenador actualizado correctamente'
                );

            } else {

                if (!form.contraseña) {

                    alert(
                        'La contraseña es obligatoria'
                    );

                    return;
                }

                await createEntrenador(
                    form
                );

                alert(
                    'Entrenador creado correctamente'
                );
            }


            loadEntrenadores();


            setEditingId(null);


            setForm({

                nombres: '',
                apellidos: '',
                correo: '',
                contraseña: '',
                experiencia: '',
                especialidad: '',
                id_estado_entrenador: ''
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
        entrenador
    ) => {

        setEditingId(
            entrenador.idEntrenador
        );

        setForm({

            nombres:
                entrenador.nombres,

            apellidos:
                entrenador.apellidos,

            correo:
                entrenador.correo,

            contraseña: '',

            experiencia:
                entrenador.experiencia,

            especialidad:
                entrenador.especialidad,

            id_estado_entrenador:
                entrenador.id_estado_entrenador
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    // =========================
    // ELIMINAR
    // =========================

    const handleDelete =
    async (id) => {

        const confirmar =
        window.confirm(
            '¿Eliminar entrenador?'
        );

        if (!confirmar) {

            return;
        }

        try {

            await deleteEntrenador(
                id
            );

            alert(
                'Entrenador eliminado correctamente'
            );

            loadEntrenadores();

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
                backgroundColor: '#F5F7FA',
                padding: '40px',
                fontFamily: 'Arial'
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

                <div>

                    <h1
                        style={{
                            color: '#0A2647',
                            marginBottom: '10px'
                        }}
                    >
                        Gestión de Entrenadores
                    </h1>

                    <p
                        style={{
                            color: '#555'
                        }}
                    >
                        Administra los entrenadores del gimnasio
                    </p>

                </div>


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


            {/* FORMULARIO */}

            <div
                style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    marginBottom: '40px'
                }}
            >

                <h2
                    style={{
                        color: '#0A2647',
                        marginBottom: '25px'
                    }}
                >

                    {

                        editingId

                        ?

                        'Actualizar Entrenador'

                        :

                        'Registrar Entrenador'

                    }

                </h2>


                <form
                    onSubmit={handleSubmit}
                >

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px'
                        }}
                    >

                        <input
                            type="text"
                            name="nombres"
                            placeholder="Nombres"
                            value={form.nombres}
                            onChange={handleChange}
                            style={inputStyle}
                        />


                        <input
                            type="text"
                            name="apellidos"
                            placeholder="Apellidos"
                            value={form.apellidos}
                            onChange={handleChange}
                            style={inputStyle}
                        />


                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo"
                            value={form.correo}
                            onChange={handleChange}
                            style={inputStyle}
                        />


                        {

                            !editingId && (

                                <input
                                    type="password"
                                    name="contraseña"
                                    placeholder="Contraseña"
                                    value={form.contraseña}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            )
                        }


                        <input
                            type="number"
                            name="experiencia"
                            placeholder="Años experiencia"
                            min="0"
                            value={form.experiencia}
                            onChange={handleChange}
                            style={inputStyle}
                        />


                        <input
                            type="text"
                            name="especialidad"
                            placeholder="Especialidad"
                            value={form.especialidad}
                            onChange={handleChange}
                            style={inputStyle}
                        />


                        <select
                            name="id_estado_entrenador"
                            value={
                                form.id_estado_entrenador
                            }
                            onChange={handleChange}
                            style={inputStyle}
                        >

                            <option value="">
                                Seleccione estado
                            </option>

                            <option value="1">
                                Activo
                            </option>

                            <option value="2">
                                Inactivo
                            </option>

                        </select>

                    </div>


                    <button
                        type="submit"
                        className="btn-custom mt-3"
                    >

                        {

                            editingId

                                ?

                                'Actualizar Entrenador'

                                :

                                'Crear Entrenador'
                        }

                    </button>

                </form>

            </div>


            {/* LISTADO */}

            <h2
                style={{
                    color: '#0A2647',
                    marginBottom: '20px'
                }}
            >
                Lista de Entrenadores
            </h2>


            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '25px'
                }}
            >

                {

                    entrenadores.map(
                        (entrenador) => (

                        <div
                            key={
                                entrenador.idEntrenador
                            }
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '25px',
                                boxShadow:
                                    '0 4px 12px rgba(0,0,0,0.08)'
                            }}
                        >

                            <h3
                                style={{
                                    color: '#144272',
                                    marginBottom: '15px'
                                }}
                            >

                                {entrenador.nombres}

                                {' '}

                                {entrenador.apellidos}

                            </h3>

                            <p>
                                <strong>
                                    Correo:
                                </strong>

                                {' '}

                                {entrenador.correo}
                            </p>

                            <p>
                                <strong>
                                    Especialidad:
                                </strong>

                                {' '}

                                {entrenador.especialidad}
                            </p>

                            <p>
                                <strong>
                                    Experiencia:
                                </strong>

                                {' '}

                                {entrenador.experiencia}
                                años
                            </p>

                            <p>
                                <strong>
                                    Estado:
                                </strong>

                                {' '}

                                {entrenador.estado_entrenador}
                            </p>


                            <div
                                style={{
                                    display: 'flex',
                                    gap: '12px',
                                    marginTop: '20px'
                                }}
                            >

                                    <button
                                        onClick={() =>
                                            handleEdit(entrenador)
                                        }
                                        className="btn-custom"
                                    >

                                        Editar

                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                entrenador.idEntrenador
                                            )
                                        }
                                        className="btn-delete"
                                    >

                                        Eliminar

                                    </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}


// =========================
// ESTILOS INPUTS
// =========================

const inputStyle = {

    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '15px',
    outline: 'none'
};


export default GestionEntrenadoresPage;