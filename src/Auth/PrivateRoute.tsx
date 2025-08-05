// components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import { JSX } from 'react';
import Loader from '../Components/Loader/Loader';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();

    // Enquanto ainda estamos checando o cookie no backend,
    // mostramos um indicador de carregamento.
    if (isLoading) {
        return <Loader />;
    }

    // Se não estiver autenticado, redireciona ao login.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Usuário está autenticado e carregamento terminou → renderiza a rota.
    return children;
};

export default PrivateRoute;
