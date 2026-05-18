import axios from 'axios';

const API_URL =
'http://localhost:3000/api/asistencias';


const authHeader = () => {

    const token =
        localStorage.getItem('token');

    return {

        headers: {

            Authorization:
                `Bearer ${token}`
        }
    };
};


// =========================
// REGISTRAR
// =========================

export const registrarAsistencia =
async (data) => {

    const response =
    await axios.post(

        API_URL,

        data,

        authHeader()
    );

    return response.data;
};


// =========================
// ASISTENTES POR CLASE
// =========================

export const getAsistentesByClase =
async (idClase) => {

    const response =
    await axios.get(

        `${API_URL}/clase/${idClase}`,

        authHeader()
    );

    return response.data;
};