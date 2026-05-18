import {

    Link,
    useNavigate

} from 'react-router-dom';

import {

    useContext

} from 'react';

import {

    AuthContext

} from '../context/AuthContext';


function AdminPage() {

    const navigate =
        useNavigate();

    const {

        logout

    } = useContext(
        AuthContext
    );


    const handleLogout = () => {

        logout();

        navigate('/');
    };


    return (

        <div>

            <h1>
                Panel Administrador
            </h1>

            <hr />


            <h2>
                Módulos del Sistema
            </h2>


            <ul>

                <li>

                    <Link to="/admin/clases">

                        Gestión de Clases

                    </Link>

                </li>


                <li>

                    <Link
                        to="/admin/entrenadores"
                    >

                        Gestión de Entrenadores

                    </Link>

                </li>


                <li>

                    <Link
                        to="/admin/membresias"
                    >

                        Gestión de Membresías

                    </Link>

                </li>


                <li>

                    <Link
                        to="/admin/pagos"
                    >

                        Gestión de Pagos

                    </Link>

                </li>

            </ul>


            <hr />


            <button
                onClick={handleLogout}
            >

                Cerrar Sesión

            </button>

        </div>
    );
}

export default AdminPage;