import axios from 'axios';

const API_URL =
    'http://localhost:3000/api/auth';

export const loginRequest = async (data) => {

    const response = await axios.post(
        `${API_URL}/login`,
        data
    );

    return response.data;
};

//registro de cliente (público)
export const registerRequest = async (data) => {
    const response = await axios.post(
        `${API_URL}/register-client`,
        data
    );

    return response.data;
};