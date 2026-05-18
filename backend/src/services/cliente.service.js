const pool =
require('../../config/db');


// =========================
// OBTENER CLIENTES
// =========================

const getClientes = async () => {

    const [rows] = await pool.query(`
    
        SELECT

            c.idCliente,

            u.nombres,
            u.apellidos,
            u.correo

        FROM cliente c

        INNER JOIN usuario u
            ON c.id_usuario =
            u.idUsuario
    `);

    return rows;
};


// =========================
// OBTENER CLIENTE POR ID
// =========================

const getClienteById =
async (id) => {

    const [rows] =
    await pool.query(`
    
        SELECT

            c.idCliente,

            u.nombres,
            u.apellidos,
            u.correo

        FROM cliente c

        INNER JOIN usuario u
            ON c.id_usuario =
            u.idUsuario

        WHERE c.idCliente = ?

    `,
    [id]);


    if (rows.length === 0) {

        throw new Error(
            'Cliente no encontrado'
        );
    }

    return rows[0];
};


module.exports = {

    getClientes,
    getClienteById
};