const pool = require('../config/db');

const createMembresia = async (
    membresiaData
) => {

    const {

        tipo,
        fecha_inicio,
        fecha_fin,
        id_estado_membresia,
        id_cliente

    } = membresiaData;



    // VALIDAR CAMPOS VACÍOS
    if (

        !tipo ||
        !fecha_inicio ||
        !fecha_fin ||
        !id_estado_membresia ||
        !id_cliente

    ) {

        throw new Error(
            'Todos los campos son obligatorios'
        );
    }


    
    // VALIDAR FECHAS
    if (

        new Date(fecha_fin)
        <=
        new Date(fecha_inicio)

    ) {

        throw new Error(
            'La fecha final debe ser mayor que la inicial'
        );
    }


   
    // VALIDAR CLIENTE
    const [clienteRows] =
    await pool.query(

        `SELECT *
         FROM cliente
         WHERE idCliente = ?`,

        [id_cliente]
    );


    if (clienteRows.length === 0) {

        throw new Error(
            'Cliente no encontrado'
        );
    }


    
    // VALIDAR MEMBRESÍA ACTIVA
    const [membresiaActiva] =
    await pool.query(`

        SELECT *
        FROM membresia
        WHERE id_cliente = ?
        AND id_estado_membresia = 1

    `,
    [id_cliente]);


    if (membresiaActiva.length > 0) {

        throw new Error(
            'El cliente ya tiene una membresía activa'
        );
    }


    
    // CREAR MEMBRESÍA
    const [result] =
    await pool.query(`

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

        message:
            'Membresía creada correctamente',

        idMembresia:
            result.insertId
    };
};

const getMembresias = async () => {

    const [rows] = await pool.query(`
    
        SELECT

            m.idMembresia,

            m.tipo,
            m.fecha_inicio,
            m.fecha_fin,

            m.id_estado_membresia,

            em.nombre AS estado_membresia,

            c.idCliente,

            u.nombres,
            u.apellidos

        FROM membresia m

        INNER JOIN estado_membresia em
            ON m.id_estado_membresia =
            em.idEstadoMembresia

        INNER JOIN cliente c
            ON m.id_cliente =
            c.idCliente

        INNER JOIN usuario u
            ON c.id_usuario =
            u.idUsuario
    `);

    return rows;
};

const getMembresiaById =
async (id) => {

    const [rows] =
    await pool.query(`
    
        SELECT

            m.idMembresia,

            m.tipo,
            m.fecha_inicio,
            m.fecha_fin,

            m.id_estado_membresia,

            em.nombre AS estado_membresia,

            c.idCliente,

            u.nombres,
            u.apellidos

        FROM membresia m

        INNER JOIN estado_membresia em
            ON m.id_estado_membresia =
            em.idEstadoMembresia

        INNER JOIN cliente c
            ON m.id_cliente =
            c.idCliente

        INNER JOIN usuario u
            ON c.id_usuario =
            u.idUsuario

        WHERE m.idMembresia = ?

    `,
    [id]);


    if (rows.length === 0) {

        throw new Error(
            'Membresía no encontrada'
        );
    }

    return rows[0];
};

const updateMembresia =
async (
    id,
    membresiaData
) => {

    const {

        tipo,
        fecha_inicio,
        fecha_fin,
        id_estado_membresia,
        id_cliente

    } = membresiaData;


   
    // VALIDAR EXISTENCIA
    const [rows] =
    await pool.query(

        `SELECT *
         FROM membresia
         WHERE idMembresia = ?`,

        [id]
    );


    if (rows.length === 0) {

        throw new Error(
            'Membresía no encontrada'
        );
    }


    
    // VALIDAR CAMPOS
    if (

        !tipo ||
        !fecha_inicio ||
        !fecha_fin ||
        !id_estado_membresia ||
        !id_cliente

    ) {

        throw new Error(
            'Todos los campos son obligatorios'
        );
    }


    
    // VALIDAR FECHAS
    if (

        new Date(fecha_fin)
        <=
        new Date(fecha_inicio)

    ) {

        throw new Error(
            'La fecha final debe ser mayor'
        );
    }


    
    // ACTUALIZAR
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

        message:
            'Membresía actualizada correctamente'
    };
};

const deleteMembresia =
async (id) => {

    
    // VALIDAR EXISTENCIA
    const [rows] =
    await pool.query(

        `SELECT *
         FROM membresia
         WHERE idMembresia = ?`,

        [id]
    );


    if (rows.length === 0) {

        throw new Error(
            'Membresía no encontrada'
        );
    }


    // =========================
    // VALIDAR PAGOS
    // =========================

    const [pagosRows] =
    await pool.query(`

        SELECT *
        FROM pago
        WHERE id_membresia = ?

    `,
    [id]);


    if (pagosRows.length > 0) {

        throw new Error(
            'No se puede eliminar la membresía porque tiene pagos asociados'
        );
    }


    // =========================
    // ELIMINAR
    // =========================

    await pool.query(

        `DELETE FROM membresia
         WHERE idMembresia = ?`,

        [id]
    );


    return {

        message:
            'Membresía eliminada correctamente'
    };
};

module.exports = {
    createMembresia,
    getMembresias,
    getMembresiaById,
    updateMembresia,
    deleteMembresia
};