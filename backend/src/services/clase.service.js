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

const createClase = async (claseData) => {

    const {
        nombre,
        tipo,
        fecha_hora_inicio,
        fecha_hora_fin,
        aforo,
        cupo_disponible,
        id_estado_clase,
        id_entrenador,
        id_admin
    } = claseData;

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
        id_admin
    ]);

    return {
        message: 'Clase creada correctamente',
        idClase: result.insertId
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
        id_estado_clase
    } = claseData;

    await pool.query(`
        UPDATE claseGym
        SET
            nombre = ?,
            tipo = ?,
            fecha_hora_inicio = ?,
            fecha_hora_fin = ?,
            aforo = ?,
            cupo_disponible = ?,
            id_estado_clase = ?
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
        id
    ]);

    return {
        message: 'Clase actualizada correctamente'
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

module.exports = {
    getClases,
    getClaseById,
    createClase,
    updateClase,
    deleteClase
};