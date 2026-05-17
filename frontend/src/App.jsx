import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import LoginPage
from './pages/LoginPage';

import AdminPage
from './pages/AdminPage';

import ClientePage
from './pages/ClientePage';

import EntrenadorPage
from './pages/EntrenadorPage';

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/admin"
                    element={<AdminPage />}
                />

                <Route
                    path="/cliente"
                    element={<ClientePage />}
                />

                <Route
                    path="/entrenador"
                    element={<EntrenadorPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
