const pool = require('../config/db');

const registrarAsistencia = async (asistenciaData) => {

    const {
        id_cliente,
        id_clase,
        estado_asistencia
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
            estado_asistencia,
            id_cliente,
            id_clase
        )
        VALUES (NOW(), ?, ?, ?)
    `,
    [
        estado_asistencia,
        id_cliente,
        id_clase
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
            a.estado_asistencia,

            c.idCliente,

            u.nombres,
            u.apellidos

        FROM asistencia a

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

    // Obtener cliente
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

    // Consultar historial
    const [rows] = await pool.query(`
        SELECT
            a.idAsistencia,
            a.fecha,
            a.estado_asistencia,

            cg.nombre,
            cg.tipo,
            cg.fecha_hora_inicio

        FROM asistencia a

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