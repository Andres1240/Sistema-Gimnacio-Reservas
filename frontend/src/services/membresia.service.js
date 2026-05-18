import axios from 'axios';

const API_URL =
'http://localhost:3000/api/membresias';


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



export const getMembresias =
async () => {

    const response =
    await axios.get(

        API_URL,

        authHeader()
    );

    return response.data;
};



export const createMembresia =
async (data) => {

    const response =
    await axios.post(

        API_URL,

        data,

        authHeader()
    );

    return response.data;
};


export const updateMembresia =
async (id, data) => {

    const response =
    await axios.put(

        `${API_URL}/${id}`,

        data,

        authHeader()
    );

    return response.data;
};


export const deleteMembresia =
async (id) => {

    const response =
    await axios.delete(

        `${API_URL}/${id}`,

        authHeader()
    );

    return response.data;
};