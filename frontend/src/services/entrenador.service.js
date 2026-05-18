import axios from 'axios';

const API_URL =
    'http://localhost:3000/api/entrenadores';

const authHeader = () => {

    return {

        headers: {

            Authorization:
                `Bearer ${
                    localStorage.getItem('token')
                }`
        }
    };
};

export const getEntrenadores =
async () => {

    const response =
        await axios.get(
            API_URL,
            authHeader()
        );

    return response.data;
};

export const createEntrenador =
    async (data) => {

        const response =
            await axios.post(
                API_URL,
                data,
                authHeader()
            );

        return response.data;
    };

export const updateEntrenador =
async (id, data) => {

    const response =
    await axios.put(

        `${API_URL}/${id}`,

        data,

        authHeader()
    );

    return response.data;
};

export const deleteEntrenador =
async (id) => {

    const response =
    await axios.delete(

        `${API_URL}/${id}`,

        authHeader()
    );

    return response.data;
};
