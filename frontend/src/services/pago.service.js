import axios from 'axios';

const API_URL =
'http://localhost:3000/api/pagos';


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
// GET PAGOS
// =========================

export const getPagos =
async () => {

    const response =
    await axios.get(

        API_URL,

        authHeader()
    );

    return response.data;
};


// =========================
// CREATE PAGO
// =========================

export const createPago =
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
// DELETE PAGO
// =========================

export const deletePago =
async (id) => {

    const response =
    await axios.delete(

        `${API_URL}/${id}`,

        authHeader()
    );

    return response.data;
};