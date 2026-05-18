import {

    useEffect,
    useState

} from 'react';

import {

    getEntrenadores,
    createEntrenador,
    updateEntrenador,
    deleteEntrenador

} from '../services/entrenador.service';

import axios from 'axios';


function GestionEntrenadoresPage() {

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


    // =========================
    // CARGAR ESTADOS
    // =========================


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


        // VALIDACIONES FRONT

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

        <div>

            <h1>
                Gestión de Entrenadores
            </h1>

            <hr />


            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="nombres"
                    placeholder="Nombres"
                    value={form.nombres}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="apellidos"
                    placeholder="Apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                />


                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={form.correo}
                    onChange={handleChange}
                />


                {

                    !editingId && (

                        <input
                            type="password"
                            name="contraseña"
                            placeholder="Contraseña"
                            value={form.contraseña}
                            onChange={handleChange}
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
                />


                <input
                    type="text"
                    name="especialidad"
                    placeholder="Especialidad"
                    value={form.especialidad}
                    onChange={handleChange}
                />


                <select
                    name="id_estado_entrenador"
                    value={
                        form.id_estado_entrenador
                    }
                    onChange={handleChange}
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


                <button type="submit">

                    {

                        editingId

                        ?

                        'Actualizar Entrenador'

                        :

                        'Crear Entrenador'
                    }

                </button>

            </form>


            <hr />


            <h2>
                Lista de Entrenadores
            </h2>


            {

                entrenadores.map(
                    (entrenador) => (

                    <div
                        key={
                            entrenador.idEntrenador
                        }
                    >

                        <h3>

                            {entrenador.nombres}

                            {' '}

                            {entrenador.apellidos}

                        </h3>

                        <p>

                            Correo:
                            {' '}
                            {entrenador.correo}

                        </p>

                        <p>

                            Especialidad:
                            {' '}
                            {entrenador.especialidad}

                        </p>

                        <p>

                            Experiencia:
                            {' '}
                            {entrenador.experiencia}
                            años

                        </p>

                        <p>

                            Estado:
                            {' '}
                            {entrenador.estado_entrenador}

                        </p>


                        <button
                            onClick={() =>
                                handleEdit(entrenador)
                            }
                        >

                            Editar

                        </button>


                        <button
                            onClick={() =>
                                handleDelete(
                                    entrenador.idEntrenador
                                )
                            }
                        >

                            Eliminar

                        </button>

                        <hr />

                    </div>
                ))
            }

        </div>
    );
}

export default GestionEntrenadoresPage;