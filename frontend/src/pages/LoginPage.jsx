import { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { loginRequest }
from '../services/auth.service';

import { AuthContext }
from '../context/AuthContext';

function LoginPage() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({

        correo: '',
        contraseña: ''

    });

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await loginRequest(form);

            login(
                data.usuario,
                data.token
            );

            // Redirección por rol
            if (
                data.usuario.rol ===
                'ADMINISTRADOR'
            ) {

                navigate('/admin');

            } else if (
                data.usuario.rol ===
                'CLIENTE'
            ) {

                navigate('/cliente');

            } else if (
                data.usuario.rol ===
                'ENTRENADOR'
            ) {

                navigate('/entrenador');

            }

        } catch (error) {

            alert(
                error.response?.data?.error
                || 'Error al iniciar sesión'
            );
        }
    };

    return (

        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    onChange={handleChange}
                />

                <button type="submit">
                    Iniciar Sesión
                </button>

            </form>

        </div>
    );
}

export default LoginPage;