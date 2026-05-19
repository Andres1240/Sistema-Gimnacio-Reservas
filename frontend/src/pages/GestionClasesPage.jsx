import {

    useEffect,
    useState

} from 'react';

import {

    useNavigate

} from 'react-router-dom';

import {

    getClases,
    createClase,
    deleteClase,
    updateClase

} from '../services/clase.service';

import {

    getEntrenadores

} from '../services/entrenador.service';


function GestionClasesPage() {

    // =========================
    // STATES
    // =========================

    const navigate =
        useNavigate();

    const [clases, setClases] =
        useState([]);

    const [entrenadores,
        setEntrenadores] =
        useState([]);

    const [form, setForm] =
        useState({

            nombre: '',
            tipo: '',
            fecha_hora_inicio: '',
            fecha_hora_fin: '',
            aforo: '',
            cupo_disponible: '',
            id_estado_clase: '',
            id_entrenador: ''

        });

    const [editingId, setEditingId] =
        useState(null);


    // =========================
    // LOAD CLASES
    // =========================

    const loadClases = async () => {

        try {

            const data =
                await getClases();

            setClases(data);

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // LOAD ENTRENADORES
    // =========================

    const loadEntrenadores =
    async () => {

        try {

            const data =
                await getEntrenadores();

            setEntrenadores(data);

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // USE EFFECT
    // =========================

    useEffect(() => {

        loadClases();
        loadEntrenadores();

    }, []);


    // =========================
    // HANDLE INPUTS
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

            !form.nombre ||
            !form.tipo ||
            !form.fecha_hora_inicio ||
            !form.fecha_hora_fin ||
            !form.aforo ||
            !form.cupo_disponible ||
            !form.id_estado_clase ||
            !form.id_entrenador

        ) {

            alert(
                'Todos los campos son obligatorios'
            );

            return;
        }


        if (

            form.aforo < 0 ||
            form.cupo_disponible < 0

        ) {

            alert(
                'Los valores no pueden ser negativos'
            );

            return;
        }


        if (

            Number(form.cupo_disponible)
            >
            Number(form.aforo)

        ) {

            alert(
                'Los cupos no pueden superar el aforo'
            );

            return;
        }


        if (

            new Date(form.fecha_hora_fin)
            <=
            new Date(form.fecha_hora_inicio)

        ) {

            alert(
                'La fecha final debe ser mayor'
            );

            return;
        }


        try {

            if (editingId) {

                await updateClase(
                    editingId,
                    form
                );

                alert(
                    'Clase actualizada correctamente'
                );

            } else {

                await createClase(form);

                alert(
                    'Clase creada correctamente'
                );
            }


            loadClases();

            setEditingId(null);


            setForm({

                nombre: '',
                tipo: '',
                fecha_hora_inicio: '',
                fecha_hora_fin: '',
                aforo: '',
                cupo_disponible: '',
                id_estado_clase: '',
                id_entrenador: ''

            });

        } catch (error) {

            alert(

                error.response?.data?.error
                ||
                'Error al guardar clase'
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
                '¿Eliminar esta clase?'
            );

        if (!confirmar) {

            return;
        }

        try {

            await deleteClase(id);

            alert(
                'Clase eliminada correctamente'
            );

            loadClases();

        } catch (error) {

            alert(

                error.response?.data?.error
                ||
                'Error al eliminar clase'
            );
        }
    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (clase) => {

        setEditingId(
            clase.idClase
        );

        setForm({

            nombre:
                clase.nombre,

            tipo:
                clase.tipo,

            fecha_hora_inicio:
                clase.fecha_hora_inicio
                    ?.slice(0, 16),

            fecha_hora_fin:
                clase.fecha_hora_fin
                    ?.slice(0, 16),

            aforo:
                clase.aforo,

            cupo_disponible:
                clase.cupo_disponible,

            id_estado_clase:
                clase.id_estado_clase,

            id_entrenador:
                clase.id_entrenador
        });
    };


    return (

        <div
            className="
                container
                mt-5
                mb-5
            "
        >

            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <div
                className="
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-4
                "
            >

                <h1
                    className="
                        title-custom
                    "
                >

                    Gestión de Clases

                </h1>

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

            <div
                className="
                    card-custom
                    mb-5
                "
            >

                <h2
                    className="
                        mb-4
                    "
                >

                    {

                        editingId

                            ?

                            'Actualizar Clase'

                            :

                            'Crear Clase'

                    }

                </h2>


                <form
                    onSubmit={handleSubmit}
                >

                    <div
                        className="
                            row
                        "
                    >

                        {/* NOMBRE */}

                        <div
                            className="
                                col-md-6
                                mb-3
                            "
                        >

                            <label>
                                Nombre
                            </label>

                            <input
                                type="text"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                className="
                                    input-custom
                                "
                            />

                        </div>


                        {/* TIPO */}

                        <div
                            className="
                                col-md-6
                                mb-3
                            "
                        >

                            <label>
                                Tipo
                            </label>

                            <input
                                type="text"
                                name="tipo"
                                value={form.tipo}
                                onChange={handleChange}
                                className="
                                    input-custom
                                "
                            />

                        </div>


                        {/* FECHA INICIO */}

                        <div
                            className="
                                col-md-6
                                mb-3
                            "
                        >

                            <label>
                                Fecha Inicio
                            </label>

                            <input
                                type="datetime-local"
                                name="fecha_hora_inicio"
                                value={
                                    form.fecha_hora_inicio
                                }
                                onChange={handleChange}
                                className="
                                    input-custom
                                "
                            />

                        </div>


                        {/* FECHA FIN */}

                        <div
                            className="
                                col-md-6
                                mb-3
                            "
                        >

                            <label>
                                Fecha Fin
                            </label>

                            <input
                                type="datetime-local"
                                name="fecha_hora_fin"
                                value={
                                    form.fecha_hora_fin
                                }
                                onChange={handleChange}
                                className="
                                    input-custom
                                "
                            />

                        </div>


                        {/* AFORO */}

                        <div
                            className="
                                col-md-6
                                mb-3
                            "
                        >

                            <label>
                                Aforo
                            </label>

                            <input
                                type="number"
                                name="aforo"
                                value={form.aforo}
                                onChange={handleChange}
                                min="0"
                                className="
                                    input-custom
                                "
                            />

                        </div>


                        {/* CUPOS */}

                        <div
                            className="
                                col-md-6
                                mb-3
                            "
                        >

                            <label>
                                Cupos Disponibles
                            </label>

                            <input
                                type="number"
                                name="cupo_disponible"
                                value={
                                    form.cupo_disponible
                                }
                                onChange={handleChange}
                                min="0"
                                className="
                                    input-custom
                                "
                            />

                        </div>


                        {/* ESTADO */}

                        <div
                            className="
                                col-md-6
                                mb-3
                            "
                        >

                            <label>
                                Estado
                            </label>

                            <select
                                name="id_estado_clase"
                                value={
                                    form.id_estado_clase
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
                                    Programada
                                </option>

                                <option value="2">
                                    Finalizada
                                </option>

                                <option value="3">
                                    Cancelada
                                </option>

                            </select>

                        </div>


                        {/* ENTRENADOR */}

                        <div
                            className="
                                col-md-6
                                mb-3
                            "
                        >

                            <label>
                                Entrenador
                            </label>

                            <select
                                name="id_entrenador"
                                value={
                                    form.id_entrenador
                                }
                                onChange={handleChange}
                                className="
                                    input-custom
                                "
                            >

                                <option value="">
                                    Seleccione entrenador
                                </option>

                                {

                                    entrenadores.map(
                                        (entrenador) => (

                                            <option
                                                key={
                                                    entrenador.idEntrenador
                                                }

                                                value={
                                                    entrenador.idEntrenador
                                                }
                                            >

                                                {
                                                    entrenador.nombres
                                                }

                                                {' '}

                                                {
                                                    entrenador.apellidos
                                                }

                                            </option>
                                        )
                                    )
                                }

                            </select>

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="
                            btn-custom
                            mt-3
                        "
                    >

                        {

                            editingId

                                ?

                                'Actualizar Clase'

                                :

                                'Crear Clase'
                        }

                    </button>

                </form>

            </div>


            {/* ========================= */}
            {/* LISTADO */}
            {/* ========================= */}

            <h2
                className="
                    mb-4
                "
            >

                Clases Registradas

            </h2>


            <div
                className="
                    row
                "
            >

                {

                    clases.map((clase) => (

                        <div
                            key={clase.idClase}

                            className="
                                col-md-6
                                mb-4
                            "
                        >

                            <div
                                className="
                                    card-custom
                                    h-100
                                "
                            >

                                <h3>

                                    {clase.nombre}

                                </h3>

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

                                <p>

                                    <strong>
                                        Entrenador:
                                    </strong>

                                    {' '}

                                    {
                                        clase.entrenador_nombre
                                    }

                                    {' '}

                                    {
                                        clase.entrenador_apellido
                                    }

                                </p>


                                <div
                                    className="
                                        d-flex
                                        gap-2
                                        mt-3
                                    "
                                >

                                    <button

                                        onClick={() =>
                                            handleEdit(clase)
                                        }

                                        className="
                                            btn-custom
                                            w-50
                                        "
                                    >

                                        Editar

                                    </button>


                                    <button

                                        onClick={() =>
                                            handleDelete(
                                                clase.idClase
                                            )
                                        }

                                        className="
                                            btn-custom
                                            w-50
                                        "
                                    >

                                        Eliminar

                                    </button>

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default GestionClasesPage;