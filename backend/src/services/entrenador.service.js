const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createEntrenador = async (
    entrenadorData
) => {

    const {
        nombres,
        apellidos,
        correo,
        contraseña,
        experiencia,
        especialidad,
        id_estado_entrenador
    } = entrenadorData;


    // =========================
    // VALIDAR CAMPOS VACÍOS
    // =========================

    if (
        !nombres ||
        !apellidos ||
        !correo ||
        !contraseña ||
        experiencia === '' ||
        !especialidad ||
        !id_estado_entrenador
    ) {

        throw new Error(
            'Todos los campos son obligatorios'
        );
    }


    // =========================
    // VALIDAR CORREO
    // =========================

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correo)) {

        throw new Error(
            'Correo electrónico inválido'
        );
    }


    // =========================
    // VALIDAR CONTRASEÑA
    // =========================

    if (contraseña.length < 6) {

        throw new Error(
            'La contraseña debe tener mínimo 6 caracteres'
        );
    }


    // =========================
    // VALIDAR EXPERIENCIA
    // =========================

    if (experiencia < 0) {

        throw new Error(
            'La experiencia no puede ser negativa'
        );
    }


    // =========================
    // VALIDAR CORREO EXISTENTE
    // =========================

    const [existingUser] =
    await pool.query(

        `SELECT *
         FROM usuario
         WHERE correo = ?`,

        [correo]
    );


    if (existingUser.length > 0) {

        throw new Error(
            'El correo ya está registrado'
        );
    }


    // =========================
    // OBTENER ROL ENTRENADOR
    // =========================

    const [rolRows] =
    await pool.query(

        `SELECT *
         FROM rol
         WHERE nombre = 'ENTRENADOR'`
    );


    if (rolRows.length === 0) {

        throw new Error(
            'Rol ENTRENADOR no encontrado'
        );
    }


    const rol = rolRows[0];


    // =========================
    // ENCRIPTAR CONTRASEÑA
    // =========================

    const hashedPassword =
    await bcrypt.hash(
        contraseña,
        10
    );


    // =========================
    // CREAR USUARIO
    // =========================

    const [usuarioResult] =
    await pool.query(`

        INSERT INTO usuario
        (
            nombres,
            apellidos,
            correo,
            contraseña,
            id_rol
        )
        VALUES (?, ?, ?, ?, ?)

    `,
    [
        nombres,
        apellidos,
        correo,
        hashedPassword,
        rol.idRol
    ]);


    const idUsuario =
        usuarioResult.insertId;


    // =========================
    // CREAR ENTRENADOR
    // =========================

    const [entrenadorResult] =
    await pool.query(`

        INSERT INTO entrenador
        (
            id_usuario,
            experiencia,
            especialidad,
            id_estado_entrenador
        )
        VALUES (?, ?, ?, ?)

    `,
    [
        idUsuario,
        experiencia,
        especialidad,
        id_estado_entrenador
    ]);


    return {

        message:
            'Entrenador creado correctamente',

        idEntrenador:
            entrenadorResult.insertId
    };
};

const getEntrenadores = async () => {

    const [rows] = await pool.query(`
    
        SELECT

            e.idEntrenador,

            e.id_estado_entrenador,

            u.nombres,
            u.apellidos,
            u.correo,

            e.experiencia,
            e.especialidad,

            ee.nombre AS estado_entrenador

        FROM entrenador e

        INNER JOIN usuario u
            ON e.id_usuario = u.idUsuario

        INNER JOIN estado_entrenador ee
            ON e.id_estado_entrenador = ee.idEstadoEntrenador
    `);

    return rows;
};

const getEntrenadorById = async (id) => {

    const [rows] = await pool.query(`
    
        SELECT

            e.idEntrenador,

            e.id_estado_entrenador,

            u.nombres,
            u.apellidos,
            u.correo,

            e.experiencia,
            e.especialidad,

            ee.nombre AS estado_entrenador

        FROM entrenador e

        INNER JOIN usuario u
            ON e.id_usuario = u.idUsuario

        INNER JOIN estado_entrenador ee
            ON e.id_estado_entrenador = ee.idEstadoEntrenador

        WHERE e.idEntrenador = ?
    `,
    [id]);


    if (rows.length === 0) {

        throw new Error(
            'Entrenador no encontrado'
        );
    }

    return rows[0];
};

const updateEntrenador = async (
    id,
    entrenadorData
) => {

    const {
        nombres,
        apellidos,
        correo,
        experiencia,
        especialidad,
        id_estado_entrenador
    } = entrenadorData;


    // =========================
    // VALIDAR EXISTENCIA
    // =========================

    const [entrenadorRows] =
    await pool.query(

        `SELECT *
         FROM entrenador
         WHERE idEntrenador = ?`,

        [id]
    );


    if (entrenadorRows.length === 0) {

        throw new Error(
            'Entrenador no encontrado'
        );
    }


    const entrenador =
        entrenadorRows[0];


    // =========================
    // VALIDAR CAMPOS VACÍOS
    // =========================

    if (
        !nombres ||
        !apellidos ||
        !correo ||
        experiencia === '' ||
        !especialidad ||
        !id_estado_entrenador
    ) {

        throw new Error(
            'Todos los campos son obligatorios'
        );
    }


    // =========================
    // VALIDAR CORREO
    // =========================

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(correo)) {

        throw new Error(
            'Correo electrónico inválido'
        );
    }


    // =========================
    // VALIDAR EXPERIENCIA
    // =========================

    if (experiencia < 0) {

        throw new Error(
            'La experiencia no puede ser negativa'
        );
    }


    // =========================
    // VALIDAR CORREO REPETIDO
    // =========================

    const [correoExistente] =
    await pool.query(`

        SELECT *
        FROM usuario
        WHERE correo = ?
        AND idUsuario != ?

    `,
    [
        correo,
        entrenador.id_usuario
    ]);


    if (correoExistente.length > 0) {

        throw new Error(
            'El correo ya está registrado'
        );
    }


    // =========================
    // ACTUALIZAR USUARIO
    // =========================

    await pool.query(`
    
        UPDATE usuario
        SET
            nombres = ?,
            apellidos = ?,
            correo = ?
        WHERE idUsuario = ?

    `,
    [
        nombres,
        apellidos,
        correo,
        entrenador.id_usuario
    ]);


    // =========================
    // ACTUALIZAR ENTRENADOR
    // =========================

    await pool.query(`
    
        UPDATE entrenador
        SET
            experiencia = ?,
            especialidad = ?,
            id_estado_entrenador = ?
        WHERE idEntrenador = ?

    `,
    [
        experiencia,
        especialidad,
        id_estado_entrenador,
        id
    ]);


    return {

        message:
            'Entrenador actualizado correctamente'
    };
};

const deleteEntrenador = async (
    id
) => {

    // =========================
    // VALIDAR EXISTENCIA
    // =========================

    const [entrenadorRows] =
    await pool.query(

        `SELECT *
         FROM entrenador
         WHERE idEntrenador = ?`,

        [id]
    );


    if (entrenadorRows.length === 0) {

        throw new Error(
            'Entrenador no encontrado'
        );
    }


    const entrenador =
        entrenadorRows[0];


    // =========================
    // VALIDAR CLASES ASIGNADAS
    // =========================

    const [clasesRows] =
    await pool.query(`

        SELECT *
        FROM claseGym
        WHERE id_entrenador = ?

    `,
    [id]);


    if (clasesRows.length > 0) {

        throw new Error(
            'No se puede eliminar el entrenador porque tiene clases asignadas'
        );
    }


    // =========================
    // ELIMINAR ENTRENADOR
    // =========================

    await pool.query(

        `DELETE FROM entrenador
         WHERE idEntrenador = ?`,

        [id]
    );


    // =========================
    // ELIMINAR USUARIO
    // =========================

    await pool.query(

        `DELETE FROM usuario
         WHERE idUsuario = ?`,

        [entrenador.id_usuario]
    );


    return {

        message:
            'Entrenador eliminado correctamente'
    };
};

module.exports = {
    createEntrenador,
    getEntrenadores,
    getEntrenadorById,
    updateEntrenador,
    deleteEntrenador
};