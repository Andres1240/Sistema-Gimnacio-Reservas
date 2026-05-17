const pool = require('../config/db');

const registrarAsistencia = async (asistenciaData) => {

    const {
        id_cliente,
        id_clase,
        id_estado_asistencia
    } = asistenciaData;

    // Verificar reserva
    const [reservaRows] = await pool.query(`
        SELECT *
        FROM reserva
        WHERE id_cliente = ?
        AND id_clase = ?
    `,
    [id_cliente, id_clase]);

    if (reservaRows.length === 0) {

        throw new Error(
            'El cliente no tiene reserva para esta clase'
        );

    }

    // Verificar asistencia existente
    const [asistenciaExistente] = await pool.query(`
        SELECT *
        FROM asistencia
        WHERE id_cliente = ?
        AND id_clase = ?
    `,
    [id_cliente, id_clase]);

    if (asistenciaExistente.length > 0) {

        throw new Error(
            'La asistencia ya fue registrada'
        );

    }

    // Registrar asistencia
    const [result] = await pool.query(`
        INSERT INTO asistencia
        (
            fecha,
            id_cliente,
            id_clase,
            id_estado_asistencia
        )
        VALUES (NOW(), ?, ?, ?)
    `,
    [
        id_cliente,
        id_clase,
        id_estado_asistencia
    ]);

    return {

        message: 'Asistencia registrada correctamente',
        idAsistencia: result.insertId

    };
};

const getAsistentesByClase = async (idClase) => {

    const [rows] = await pool.query(`
        SELECT
            a.idAsistencia,
            a.fecha,

            ea.nombre AS estado_asistencia,

            c.idCliente,

            u.nombres,
            u.apellidos

        FROM asistencia a

        INNER JOIN estado_asistencia ea
            ON a.id_estado_asistencia =
               ea.idEstadoAsistencia

        INNER JOIN cliente c
            ON a.id_cliente = c.idCliente

        INNER JOIN usuario u
            ON c.id_usuario = u.idUsuario

        WHERE a.id_clase = ?
    `,
    [idClase]);

    return rows;
};

const getMisAsistencias = async (user) => {

    const [clienteRows] = await pool.query(`
        SELECT *
        FROM cliente
        WHERE id_usuario = ?
    `,
    [user.idUsuario]);

    if (clienteRows.length === 0) {
        throw new Error('Cliente no encontrado');
    }

    const cliente = clienteRows[0];

    const [rows] = await pool.query(`
        SELECT
            a.idAsistencia,
            a.fecha,

            ea.nombre AS estado_asistencia,

            cg.nombre,
            cg.tipo,
            cg.fecha_hora_inicio

        FROM asistencia a

        INNER JOIN estado_asistencia ea
            ON a.id_estado_asistencia =
               ea.idEstadoAsistencia

        INNER JOIN claseGym cg
            ON a.id_clase = cg.idClase

        WHERE a.id_cliente = ?
    `,
    [cliente.idCliente]);

    return rows;
};

module.exports = {
    registrarAsistencia,
    getAsistentesByClase,
    getMisAsistencias
};