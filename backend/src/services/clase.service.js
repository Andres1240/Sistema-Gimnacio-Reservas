const pool = require('../config/db');

const getClases = async () => {

    const [rows] = await pool.query(`
    
        SELECT 
        
        c.idClase,
        c.nombre,
        c.tipo,
        c.fecha_hora_inicio,
        c.fecha_hora_fin,
        c.aforo,
        c.cupo_disponible,

        c.id_estado_clase,
        c.id_entrenador,

        ec.nombre AS estado_clase,

        u.nombres AS entrenador_nombre,
        u.apellidos AS entrenador_apellido

        FROM claseGym c

        INNER JOIN estado_clase ec
            ON c.id_estado_clase = ec.idEstadoClase

        INNER JOIN entrenador e
            ON c.id_entrenador = e.idEntrenador

        INNER JOIN usuario u
            ON e.id_usuario = u.idUsuario
    `);

    return rows;
};

const getClaseById = async (id) => {

    const [rows] = await pool.query(
        'SELECT * FROM claseGym WHERE idClase = ?',
        [id]
    );

    return rows[0];
};

const createClase = async (claseData, user) => {

    const {
        nombre,
        tipo,
        fecha_hora_inicio,
        fecha_hora_fin,
        aforo,
        cupo_disponible,
        id_estado_clase,
        id_entrenador
    } = claseData;


    // =========================
    // VALIDAR CAMPOS VACÍOS
    // =========================

    if (
        !nombre ||
        !tipo ||
        !fecha_hora_inicio ||
        !fecha_hora_fin ||
        aforo === '' ||
        cupo_disponible === '' ||
        !id_estado_clase ||
        !id_entrenador
    ) {

        throw new Error(
            'Todos los campos son obligatorios'
        );
    }


    // =========================
    // VALIDAR NÚMEROS NEGATIVOS
    // =========================

    if (
        aforo < 0 ||
        cupo_disponible < 0
    ) {

        throw new Error(
            'Los valores no pueden ser negativos'
        );
    }


    // =========================
    // VALIDAR CUPOS
    // =========================

    if (
        cupo_disponible > aforo
    ) {

        throw new Error(
            'Los cupos no pueden superar el aforo'
        );
    }


    // =========================
    // VALIDAR FECHAS
    // =========================

    if (
        fecha_hora_fin <=
        fecha_hora_inicio
    ) {

        throw new Error(
            'La fecha final debe ser mayor a la inicial'
        );
    }


    // =========================
    // VALIDAR CONFLICTO HORARIOS
    // =========================

    const [clasesExistentes] =
    await pool.query(`

        SELECT *
        FROM claseGym

        WHERE id_entrenador = ?

        AND (

            (
                fecha_hora_inicio < ?
                AND fecha_hora_fin > ?
            )

        )

    `,
    [
        id_entrenador,
        fecha_hora_fin,
        fecha_hora_inicio
    ]);


    if (clasesExistentes.length > 0) {

        throw new Error(
            'El entrenador ya tiene una clase en ese horario'
        );
    }


    // =========================
    // BUSCAR ADMINISTRADOR
    // =========================

    const [adminRows] =
    await pool.query(

        `SELECT *
         FROM administrador
         WHERE id_usuario = ?`,

        [user.idUsuario]
    );


    if (adminRows.length === 0) {

        throw new Error(
            'Administrador no encontrado'
        );
    }


    const admin = adminRows[0];


    // =========================
    // INSERTAR CLASE
    // =========================

    const [result] = await pool.query(`
    
        INSERT INTO claseGym
        (
            nombre,
            tipo,
            fecha_hora_inicio,
            fecha_hora_fin,
            aforo,
            cupo_disponible,
            id_estado_clase,
            id_entrenador,
            id_admin
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

    `,
    [
        nombre,
        tipo,
        fecha_hora_inicio,
        fecha_hora_fin,
        aforo,
        cupo_disponible,
        id_estado_clase,
        id_entrenador,
        admin.idAdmin
    ]);


    return {

        message:
            'Clase creada correctamente',

        idClase:
            result.insertId
    };
};

const updateClase = async (id, claseData) => {

    const {
        nombre,
        tipo,
        fecha_hora_inicio,
        fecha_hora_fin,
        aforo,
        cupo_disponible,
        id_estado_clase,
        id_entrenador
    } = claseData;


    // =========================
    // VALIDAR EXISTENCIA CLASE
    // =========================

    const [claseRows] = await pool.query(
        `
        SELECT *
        FROM claseGym
        WHERE idClase = ?
        `,
        [id]
    );

    if (claseRows.length === 0) {

        throw new Error(
            'Clase no encontrada'
        );
    }


    // =========================
    // VALIDAR CAMPOS VACÍOS
    // =========================

    if (
        !nombre ||
        !tipo ||
        !fecha_hora_inicio ||
        !fecha_hora_fin ||
        aforo === '' ||
        cupo_disponible === '' ||
        !id_estado_clase ||
        !id_entrenador
    ) {

        throw new Error(
            'Todos los campos son obligatorios'
        );
    }


    // =========================
    // VALIDAR NÚMEROS NEGATIVOS
    // =========================

    if (
        aforo < 0 ||
        cupo_disponible < 0
    ) {

        throw new Error(
            'Los valores no pueden ser negativos'
        );
    }


    // =========================
    // VALIDAR CUPOS
    // =========================

    if (
        cupo_disponible > aforo
    ) {

        throw new Error(
            'Los cupos no pueden superar el aforo'
        );
    }


    // =========================
    // VALIDAR FECHAS
    // =========================

    if (
        fecha_hora_fin <=
        fecha_hora_inicio
    ) {

        throw new Error(
            'La fecha final debe ser mayor a la inicial'
        );
    }


    // =========================
    // VALIDAR CONFLICTO HORARIOS
    // =========================

    const [clasesExistentes] =
    await pool.query(`

        SELECT *
        FROM claseGym

        WHERE id_entrenador = ?

        AND idClase != ?

        AND (

            (
                fecha_hora_inicio < ?
                AND fecha_hora_fin > ?
            )

        )

    `,
    [
        id_entrenador,
        id,
        fecha_hora_fin,
        fecha_hora_inicio
    ]);


    if (clasesExistentes.length > 0) {

        throw new Error(
            'El entrenador ya tiene una clase en ese horario'
        );
    }


    // =========================
    // ACTUALIZAR CLASE
    // =========================

    await pool.query(`
    
        UPDATE claseGym
        SET
            nombre = ?,
            tipo = ?,
            fecha_hora_inicio = ?,
            fecha_hora_fin = ?,
            aforo = ?,
            cupo_disponible = ?,
            id_estado_clase = ?,
            id_entrenador = ?
        WHERE idClase = ?

    `,
    [
        nombre,
        tipo,
        fecha_hora_inicio,
        fecha_hora_fin,
        aforo,
        cupo_disponible,
        id_estado_clase,
        id_entrenador,
        id
    ]);


    return {

        message:
            'Clase actualizada correctamente'
    };
};

const deleteClase = async (id) => {

    await pool.query(
        'DELETE FROM claseGym WHERE idClase = ?',
        [id]
    );

    return {
        message: 'Clase eliminada correctamente'
    };
};

const getMisClases =
async (user) => {

    // Buscar entrenador autenticado
    const [entrenadorRows] =
    await pool.query(

        `SELECT *
         FROM entrenador
         WHERE id_usuario = ?`,

        [user.idUsuario]
    );

    if (
        entrenadorRows.length === 0
    ) {

        throw new Error(
            'Entrenador no encontrado'
        );
    }

    const entrenador =
        entrenadorRows[0];


    // Obtener clases
    const [rows] =
    await pool.query(`

        SELECT

            c.idClase,
            c.nombre,
            c.tipo,
            c.fecha_hora_inicio,
            c.fecha_hora_fin,
            c.aforo,
            c.cupo_disponible,

            ec.nombre
            AS estado_clase

        FROM claseGym c

        INNER JOIN estado_clase ec
            ON c.id_estado_clase =
            ec.idEstadoClase

        WHERE c.id_entrenador = ?

        ORDER BY
            c.fecha_hora_inicio ASC

    `,
    [
        entrenador.idEntrenador
    ]);

    return rows;
};

module.exports = {
    getClases,
    getClaseById,
    createClase,
    updateClase,
    deleteClase,
    getMisClases
};