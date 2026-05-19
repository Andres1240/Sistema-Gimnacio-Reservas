import {

    useState,
    useContext

} from 'react';

import {

    useNavigate

} from 'react-router-dom';

import {

    loginRequest

} from '../services/auth.service';

import {

    AuthContext

} from '../context/AuthContext';


function LoginPage() {

    const navigate =
        useNavigate();

    const { login } =
        useContext(AuthContext);


    const [form, setForm] =
        useState({

            correo: '',
            contraseña: ''

        });


    // =========================
    // HANDLE INPUTS
    // =========================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });
    };


    // =========================
    // LOGIN
    // =========================

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            const data =
            await loginRequest(form);

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
                ||
                'Error al iniciar sesión'
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

                backgroundColor:
                    'var(--primary-dark)'
            }}
        >

            <div

                className="
                    card-custom
                "

                style={{

                    width: '400px'
                }}
            >

                <h1

                    className="
                        text-center
                        mb-4
                        title-custom
                    "
                >

                    GymReserve

                </h1>


                <p

                    className="
                        text-center
                        mb-4
                    "

                    style={{

                        color:
                            'var(--primary)'
                    }}
                >

                    Iniciar Sesión

                </p>


                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    {/* CORREO */}

                    <div
                        className="mb-3"
                    >

                        <label>

                            Correo

                        </label>

                        <input
                            type="email"
                            name="correo"
                            placeholder="Ingrese su correo"
                            onChange={handleChange}
                            className="
                                input-custom
                            "
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div
                        className="mb-4"
                    >

                        <label>

                            Contraseña

                        </label>

                        <input
                            type="password"
                            name="contraseña"
                            placeholder="Ingrese su contraseña"
                            onChange={handleChange}
                            className="
                                input-custom
                            "
                            required
                        />

                    </div>


                    {/* BOTON */}

                    <button

                        type="submit"

                        className="
                            btn-custom
                            w-100
                        "
                    >

                        Iniciar Sesión

                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;