const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createEntrenador = async (entrenadorData) => {

    const {
        nombres,
        apellidos,
        correo,
        contraseña,
        experiencia,
        especialidad,
        id_estado_entrenador
    } = entrenadorData;

    // Verificar si el correo ya existe
    const [existingUser] = await pool.query(
        `SELECT * FROM usuario WHERE correo = ?`,
        [correo]
    );

    if (existingUser.length > 0) {
        throw new Error('El correo ya está registrado');
    }

    // Obtener rol ENTRENADOR
    const [rolRows] = await pool.query(
        `SELECT * FROM rol
         WHERE nombre = 'ENTRENADOR'`
    );

    if (rolRows.length === 0) {
        throw new Error('Rol ENTRENADOR no encontrado');
    }

    const rol = rolRows[0];

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(
        contraseña,
        10
    );

    // Crear usuario
    const [usuarioResult] = await pool.query(`
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

    const idUsuario = usuarioResult.insertId;

    // Crear entrenador
    const [entrenadorResult] = await pool.query(`
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
        message: 'Entrenador creado correctamente',
        idEntrenador: entrenadorResult.insertId
    };
};

const getEntrenadores = async () => {

    const [rows] = await pool.query(`
        SELECT
            e.idEntrenador,

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
        throw new Error('Entrenador no encontrado');
    }

    return rows[0];
};

const updateEntrenador = async (id, entrenadorData) => {

    const {
        nombres,
        apellidos,
        correo,
        experiencia,
        especialidad,
        id_estado_entrenador
    } = entrenadorData;

    // Verificar si entrenador existe
    const [entrenadorRows] = await pool.query(
        `SELECT * FROM entrenador
         WHERE idEntrenador = ?`,
        [id]
    );

    if (entrenadorRows.length === 0) {
        throw new Error('Entrenador no encontrado');
    }

    const entrenador = entrenadorRows[0];

    // Actualizar usuario
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

    // Actualizar entrenador
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
        message: 'Entrenador actualizado correctamente'
    };
};

const deleteEntrenador = async (id) => {

    // Verificar existencia
    const [entrenadorRows] = await pool.query(
        `SELECT * FROM entrenador
         WHERE idEntrenador = ?`,
        [id]
    );

    if (entrenadorRows.length === 0) {
        throw new Error('Entrenador no encontrado');
    }

    const entrenador = entrenadorRows[0];

    // Eliminar entrenador
    await pool.query(
        `DELETE FROM entrenador
         WHERE idEntrenador = ?`,
        [id]
    );

    // Eliminar usuario relacionado
    await pool.query(
        `DELETE FROM usuario
         WHERE idUsuario = ?`,
        [entrenador.id_usuario]
    );

    return {
        message: 'Entrenador eliminado correctamente'
    };
};

module.exports = {
    createEntrenador,
    getEntrenadores,
    getEntrenadorById,
    updateEntrenador,
    deleteEntrenador
};