import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const RedirectRoot = () => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

const Router = createBrowserRouter([
    {
        path: "/",
        element: <RedirectRoot />,
    },
    {
        path: "/home",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <Home />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />,
    },
]);

export default Router;
