import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../services/auth.service';

function RegisterPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        contraseña: ''
    });

    // =========================
    // INPUT CHANGE
    // =========================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // =========================
    // REGISTER
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await registerRequest(form);

            alert(res.message);

            // redirigir al login
            navigate('/');

        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Error al registrar usuario'
            );
        }
    };

    return (
        <div
            className="
                d-flex
                justify-content-center
                align-items-center
                vh-100
            "
            style={{
                backgroundColor: 'var(--primary-dark)'
            }}
        >
            <div
                className="card-custom"
                style={{ width: '420px' }}
            >

                <h1 className="text-center mb-3 title-custom">
                    GymReserve
                </h1>

                <p
                    className="text-center mb-4"
                    style={{ color: 'var(--primary)' }}
                >
                    Registro de Cliente
                </p>

                <form onSubmit={handleSubmit}>

                    {/* NOMBRES */}
                    <div className="mb-3">
                        <label>Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            placeholder="Ingrese sus nombres"
                            onChange={handleChange}
                            className="input-custom"
                            required
                        />
                    </div>

                    {/* APELLIDOS */}
                    <div className="mb-3">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            name="apellidos"
                            placeholder="Ingrese sus apellidos"
                            onChange={handleChange}
                            className="input-custom"
                            required
                        />
                    </div>

                    {/* CORREO */}
                    <div className="mb-3">
                        <label>Correo</label>
                        <input
                            type="email"
                            name="correo"
                            placeholder="Ingrese su correo"
                            onChange={handleChange}
                            className="input-custom"
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-4">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="contraseña"
                            placeholder="Ingrese su contraseña"
                            onChange={handleChange}
                            className="input-custom"
                            required
                        />
                    </div>

                    {/* BOTON */}
                    <button
                        type="submit"
                        className="btn-custom w-100"
                    >
                        Registrarse
                    </button>

                    {/* VOLVER LOGIN */}
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="btn-custom w-100 mt-3"
                        style={{
                            backgroundColor: 'transparent',
                            border: '1px solid var(--primary)',
                            color: 'var(--primary)'
                        }}
                    >
                        Volver al login
                    </button>

                </form>
            </div>
        </div>
    );
}

export default RegisterPage;