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

            </Routes>

        </BrowserRouter>
    );
}

export default App;
