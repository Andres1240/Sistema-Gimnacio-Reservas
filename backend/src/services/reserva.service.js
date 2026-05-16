const pool = require('../config/db');

const createReserva = async (reservaData, user) => {

    const {
        id_clase,
        id_estado_reserva
    } = reservaData;

    // Buscar cliente autenticado
    const [clienteRows] = await pool.query(
        `SELECT * FROM cliente
         WHERE id_usuario = ?`,
        [user.idUsuario]
    );

    if (clienteRows.length === 0) {
        throw new Error('Cliente no encontrado');
    }

    const cliente = clienteRows[0];

    // Verificar si la clase existe
    const [claseRows] = await pool.query(
        `SELECT * FROM claseGym WHERE idClase = ?`,
        [id_clase]
    );

    if (claseRows.length === 0) {
        throw new Error('La clase no existe');
    }

    const clase = claseRows[0];

    // Validar cupos
    if (clase.cupo_disponible <= 0) {
        throw new Error('No hay cupos disponibles');
    }

    // Verificar reserva duplicada
    const [existingReserva] = await pool.query(
        `SELECT * FROM reserva
         WHERE id_cliente = ?
         AND id_clase = ?`,
        [cliente.idCliente, id_clase]
    );

    if (existingReserva.length > 0) {
        throw new Error('Ya existe una reserva para esta clase');
    }

    // Crear reserva
    const [result] = await pool.query(
        `INSERT INTO reserva
        (
            id_cliente,
            id_clase,
            id_estado_reserva
        )
        VALUES (?, ?, ?)`,
        [
            cliente.idCliente,
            id_clase,
            id_estado_reserva
        ]
    );

    // Reducir cupo
    await pool.query(
        `UPDATE claseGym
         SET cupo_disponible = cupo_disponible - 1
         WHERE idClase = ?`,
        [id_clase]
    );

    return {
        message: 'Reserva creada correctamente',
        idReserva: result.insertId
    };
};

const getReservas = async () => {

    const [rows] = await pool.query(`
        SELECT
            r.idReserva,
            r.fechaReserva,

            er.nombre AS estado_reserva,

            c.nombre AS clase,

            u.nombres AS cliente_nombre,
            u.apellidos AS cliente_apellido

        FROM reserva r

        INNER JOIN estado_reserva er
            ON r.id_estado_reserva = er.idEstadoReserva

        INNER JOIN claseGym c
            ON r.id_clase = c.idClase

        INNER JOIN cliente cl
            ON r.id_cliente = cl.idCliente

        INNER JOIN usuario u
            ON cl.id_usuario = u.idUsuario
    `);

    return rows;
};

const deleteReserva = async (id) => {

    // Obtener reserva
    const [reservaRows] = await pool.query(
        `SELECT * FROM reserva WHERE idReserva = ?`,
        [id]
    );

    if (reservaRows.length === 0) {
        throw new Error('Reserva no encontrada');
    }

    const reserva = reservaRows[0];

    // Eliminar reserva
    await pool.query(
        `DELETE FROM reserva WHERE idReserva = ?`,
        [id]
    );

    // Recuperar cupo
    await pool.query(
        `UPDATE claseGym
         SET cupo_disponible = cupo_disponible + 1
         WHERE idClase = ?`,
        [reserva.id_clase]
    );

    return {
        message: 'Reserva eliminada correctamente'
    };
};

module.exports = {
    createReserva,
    getReservas,
    deleteReserva
};