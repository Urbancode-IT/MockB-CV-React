import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import PageLoader from './PageLoader';

function reasonForPath(pathname = '') {
    if (pathname.includes('/customizer') || pathname.includes('builder')) {
        return 'Sign in to open the builder and save your work.';
    }
    if (pathname.includes('/dashboard')) {
        return 'Sign in to access your dashboard.';
    }
    if (pathname.includes('/templates')) {
        return 'Sign in to continue with this template.';
    }
    return 'Sign in to continue where you left off.';
}

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <PageLoader />;
    }

    if (user) return <Outlet />;

    return (
        <Navigate
            to="/login"
            replace
            state={{
                from: location,
                reason: reasonForPath(location.pathname),
            }}
        />
    );
};

export default ProtectedRoute;
