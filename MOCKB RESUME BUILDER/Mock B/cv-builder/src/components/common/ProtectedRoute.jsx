import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import PageLoader from './PageLoader';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <PageLoader />;
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
