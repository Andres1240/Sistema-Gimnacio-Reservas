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