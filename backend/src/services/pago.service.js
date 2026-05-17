const pool = require('../config/db');

const createPago = async (pagoData) => {

    const {
        monto,
        metodo_pago,
        id_cliente,
        id_membresia
    } = pagoData;

    // Verificar cliente
    const [clienteRows] = await pool.query(`
        SELECT *
        FROM cliente
        WHERE idCliente = ?
    `,
    [id_cliente]);

    if (clienteRows.length === 0) {
        throw new Error('Cliente no encontrado');
    }

    // Verificar membresía
    const [membresiaRows] = await pool.query(`
        SELECT *
        FROM membresia
        WHERE idMembresia = ?
    `,
    [id_membresia]);

    if (membresiaRows.length === 0) {
        throw new Error('Membresía no encontrada');
    }

    // Registrar pago
    const [result] = await pool.query(`
        INSERT INTO pago
        (
            monto,
            metodo_pago,
            id_cliente,
            id_membresia
        )
        VALUES (?, ?, ?, ?)
    `,
    [
        monto,
        metodo_pago,
        id_cliente,
        id_membresia
    ]);

    return {
        message: 'Pago registrado correctamente',
        idPago: result.insertId
    };
};

const getPagos = async () => {

    const [rows] = await pool.query(`
        SELECT
            p.idPago,
            p.monto,
            p.fecha_pago,
            p.metodo_pago,

            c.idCliente,

            u.nombres,
            u.apellidos,

            m.tipo AS membresia

        FROM pago p

        INNER JOIN cliente c
            ON p.id_cliente = c.idCliente

        INNER JOIN usuario u
            ON c.id_usuario = u.idUsuario

        INNER JOIN membresia m
            ON p.id_membresia = m.idMembresia
    `);

    return rows;
};

const getPagoById = async (id) => {

    const [rows] = await pool.query(`
        SELECT
            p.idPago,
            p.monto,
            p.fecha_pago,
            p.metodo_pago,

            c.idCliente,

            u.nombres,
            u.apellidos,

            m.tipo AS membresia

        FROM pago p

        INNER JOIN cliente c
            ON p.id_cliente = c.idCliente

        INNER JOIN usuario u
            ON c.id_usuario = u.idUsuario

        INNER JOIN membresia m
            ON p.id_membresia = m.idMembresia

        WHERE p.idPago = ?
    `,
    [id]);

    if (rows.length === 0) {
        throw new Error('Pago no encontrado');
    }

    return rows[0];
};

const deletePago = async (id) => {

    const [rows] = await pool.query(`
        SELECT *
        FROM pago
        WHERE idPago = ?
    `,
    [id]);

    if (rows.length === 0) {
        throw new Error('Pago no encontrado');
    }

    await pool.query(`
        DELETE FROM pago
        WHERE idPago = ?
    `,
    [id]);

    return {
        message: 'Pago eliminado correctamente'
    };
};

module.exports = {
    createPago,
    getPagos,
    getPagoById,
    deletePago
};