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