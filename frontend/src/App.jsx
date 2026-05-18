import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import { useContext }
from 'react';

import { AuthContext }
from './context/AuthContext';

import ProtectedRoute
from './routes/ProtectedRoute';

import LoginPage
from './pages/LoginPage';

import AdminPage
from './pages/AdminPage';

import ClientePage
from './pages/ClientePage';

import EntrenadorPage
from './pages/EntrenadorPage';

import GestionClasesPage
from './pages/GestionClasesPage';

import GestionEntrenadoresPage
from './pages/GestionEntrenadoresPage';

import GestionMembresiasPage
from './pages/GestionMembresiasPage';

import GestionPagosPage
from './pages/GestionPagosPage';

import ClienteReservasPage
from './pages/ClienteReservasPage';

import MisReservasPage
from './pages/MisReservasPage';

import MiMembresiaPage
from './pages/MiMembresiaPage';

import MisClasesEntrenadorPage
from './pages/MisClasesEntrenadorPage';

import AsistenciasEntrenadorPage
from './pages/AsistenciasEntrenadorPage';

function App() {

    const { user } =
        useContext(AuthContext);

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                {/* ADMIN */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'ADMINISTRADOR'
                            ]}
                        >

                            <AdminPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/clases"
                    element={

                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'ADMINISTRADOR'
                            ]}
                        >

                            <GestionClasesPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/entrenadores"
                    element={

                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'ADMINISTRADOR'
                            ]}
                        >

                            <GestionEntrenadoresPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/membresias"
                    element={

                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'ADMINISTRADOR'
                            ]}
                        >

                            <GestionMembresiasPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/pagos"
                    element={

                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'ADMINISTRADOR'
                            ]}
                        >

                            <GestionPagosPage />

                        </ProtectedRoute>
                    }
                />

                {/* CLIENTE */}
                <Route
                    path="/cliente"
                    element={
                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'CLIENTE'
                            ]}
                        >

                            <ClientePage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cliente/reservas"
                    element={

                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'CLIENTE'
                            ]}
                        >

                            <ClienteReservasPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cliente/mis-reservas"
                    element={

                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'CLIENTE'
                            ]}
                        >

                            <MisReservasPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cliente/membresia"
                    element={

                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'CLIENTE'
                            ]}
                        >

                            <MiMembresiaPage />

                        </ProtectedRoute>
                    }
                />

                {/* ENTRENADOR */}
                <Route
                    path="/entrenador"
                    element={
                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'ENTRENADOR'
                            ]}
                        >

                            <EntrenadorPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/entrenador/clases"
                    element={

                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'ENTRENADOR'
                            ]}
                        >

                            <MisClasesEntrenadorPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/entrenador/asistencias"
                    element={

                        <ProtectedRoute
                            user={user}
                            allowedRoles={[
                                'ENTRENADOR'
                            ]}
                        >

                            <AsistenciasEntrenadorPage />

                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
