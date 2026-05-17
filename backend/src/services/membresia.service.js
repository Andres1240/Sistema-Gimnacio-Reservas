const pool = require('../config/db');

const createMembresia = async (membresiaData) => {

    const {
        tipo,
        fecha_inicio,
        fecha_fin,
        id_estado_membresia,
        id_cliente
    } = membresiaData;

    // Verificar cliente
    const [clienteRows] = await pool.query(
        `SELECT * FROM cliente
         WHERE idCliente = ?`,
        [id_cliente]
    );

    if (clienteRows.length === 0) {
        throw new Error('Cliente no encontrado');
    }

    // Crear membresía
    const [result] = await pool.query(`
        INSERT INTO membresia
        (
            tipo,
            fecha_inicio,
            fecha_fin,
            id_estado_membresia,
            id_cliente
        )
        VALUES (?, ?, ?, ?, ?)
    `,
    [
        tipo,
        fecha_inicio,
        fecha_fin,
        id_estado_membresia,
        id_cliente
    ]);

    return {
        message: 'Membresía creada correctamente',
        idMembresia: result.insertId
    };
};

const getMembresias = async () => {

    const [rows] = await pool.query(`
        SELECT
            m.idMembresia,
            m.tipo,
            m.fecha_inicio,
            m.fecha_fin,

            em.nombre AS estado_membresia,

            c.idCliente,

            u.nombres,
            u.apellidos

        FROM membresia m

        INNER JOIN estado_membresia em
            ON m.id_estado_membresia = em.idEstadoMembresia

        INNER JOIN cliente c
            ON m.id_cliente = c.idCliente

        INNER JOIN usuario u
            ON c.id_usuario = u.idUsuario
    `);

    return rows;
};

const getMembresiaById = async (id) => {

    const [rows] = await pool.query(`
        SELECT
            m.idMembresia,
            m.tipo,
            m.fecha_inicio,
            m.fecha_fin,

            em.nombre AS estado_membresia,

            c.idCliente,

            u.nombres,
            u.apellidos

        FROM membresia m

        INNER JOIN estado_membresia em
            ON m.id_estado_membresia = em.idEstadoMembresia

        INNER JOIN cliente c
            ON m.id_cliente = c.idCliente

        INNER JOIN usuario u
            ON c.id_usuario = u.idUsuario

        WHERE m.idMembresia = ?
    `,
    [id]);

    if (rows.length === 0) {
        throw new Error('Membresía no encontrada');
    }

    return rows[0];
};

const updateMembresia = async (id, membresiaData) => {

    const {
        tipo,
        fecha_inicio,
        fecha_fin,
        id_estado_membresia,
        id_cliente
    } = membresiaData;

    const [rows] = await pool.query(
        `SELECT * FROM membresia
         WHERE idMembresia = ?`,
        [id]
    );

    if (rows.length === 0) {
        throw new Error('Membresía no encontrada');
    }

    await pool.query(`
        UPDATE membresia
        SET
            tipo = ?,
            fecha_inicio = ?,
            fecha_fin = ?,
            id_estado_membresia = ?,
            id_cliente = ?
        WHERE idMembresia = ?
    `,
    [
        tipo,
        fecha_inicio,
        fecha_fin,
        id_estado_membresia,
        id_cliente,
        id
    ]);

    return {
        message: 'Membresía actualizada correctamente'
    };
};

const deleteMembresia = async (id) => {

    const [rows] = await pool.query(
        `SELECT * FROM membresia
         WHERE idMembresia = ?`,
        [id]
    );

    if (rows.length === 0) {
        throw new Error('Membresía no encontrada');
    }

    await pool.query(
        `DELETE FROM membresia
         WHERE idMembresia = ?`,
        [id]
    );

    return {
        message: 'Membresía eliminada correctamente'
    };
};

module.exports = {
    createMembresia,
    getMembresias,
    getMembresiaById,
    updateMembresia,
    deleteMembresia
};