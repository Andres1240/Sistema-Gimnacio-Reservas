const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {

    const {
        nombres,
        apellidos,
        correo,
        contraseña,
        id_rol
    } = userData;

    // Verificar si el correo ya existe
    const [existingUser] = await pool.query(
        'SELECT * FROM usuario WHERE correo = ?',
        [correo]
    );

    if (existingUser.length > 0) {
        throw new Error('El correo ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar usuario
    const [result] = await pool.query(
        `INSERT INTO usuario 
        (nombres, apellidos, correo, contraseña, id_rol)
        VALUES (?, ?, ?, ?, ?)`,
        [nombres, apellidos, correo, hashedPassword, id_rol]
    );

    return {
        message: 'Usuario registrado correctamente',
        idUsuario: result.insertId
    };
};

const loginUser = async (correo, contraseña) => {

    const [rows] = await pool.query(
        `SELECT u.*, r.nombre AS rol
         FROM usuario u
         INNER JOIN rol r ON u.id_rol = r.idRol
         WHERE correo = ?`,
        [correo]
    );

    if (rows.length === 0) {
        throw new Error('Correo o contraseña incorrectos');
    }

    const user = rows[0];

    // Comparar contraseña
    const validPassword = await bcrypt.compare(
        contraseña,
        user.contraseña
    );

    if (!validPassword) {
        throw new Error('Correo o contraseña incorrectos');
    }

    // Generar token
    const token = jwt.sign(
        {
            idUsuario: user.idUsuario,
            rol: user.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '8h'
        }
    );

    return {
        token,
        usuario: {
            id: user.idUsuario,
            nombres: user.nombres,
            apellidos: user.apellidos,
            correo: user.correo,
            rol: user.rol
        }
    };
};

module.exports = {
    registerUser,
    loginUser
};