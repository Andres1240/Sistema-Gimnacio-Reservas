const pool = require('../config/db');

const getClases = async () => {

    const [rows] = await pool.query(`
        SELECT 
            c.*,
            e.idEntrenador,
            u.nombres AS entrenador_nombre
        FROM claseGym c
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
        estado,
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
            estado,
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
        estado,
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
        estado
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
            estado = ?
        WHERE idClase = ?
    `,
    [
        nombre,
        tipo,
        fecha_hora_inicio,
        fecha_hora_fin,
        aforo,
        cupo_disponible,
        estado,
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