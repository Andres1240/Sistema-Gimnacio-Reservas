import axios from 'axios';

const API_URL =
    'http://localhost:3000/api/clases';


// Obtener token
const getToken = () => {

    return localStorage.getItem('token');
};


// Config headers
const authHeader = () => {

    return {

        headers: {

            Authorization:
                `Bearer ${getToken()}`

        }

    };
};


// Obtener clases
export const getClases = async () => {

    const response = await axios.get(
        API_URL,
        authHeader()
    );

    return response.data;
};


// Crear clase
export const createClase = async (data) => {

    const response = await axios.post(
        API_URL,
        data,
        authHeader()
    );

    return response.data;
};