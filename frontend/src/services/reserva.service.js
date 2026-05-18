import axios from 'axios';

const API_URL =
'http://localhost:3000/api/reservas';


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
// CREAR RESERVA
// =========================

export const createReserva =
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
// MIS RESERVAS
// =========================

export const getMisReservas =
async () => {

    const response =
    await axios.get(

        `${API_URL}/mis-reservas`,

        authHeader()
    );

    return response.data;
};


// =========================
// ELIMINAR RESERVA
// =========================

export const deleteReserva =
async (id) => {

    const response =
    await axios.delete(

        `${API_URL}/${id}`,

        authHeader()
    );

    return response.data;
};