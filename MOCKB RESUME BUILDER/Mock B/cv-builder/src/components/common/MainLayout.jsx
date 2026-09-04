import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../home/navbar/Navbar';
import HomeFooter from '../home/footer/Footer';

export default function MainLayout() {
    const location = useLocation();

    // Full-screen tool pages that manage their own chrome
    const isNoHeaderFooterPage =
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/resume/ats-checker' ||
        location.pathname === '/resume/ats_checker' ||
        location.pathname === '/cover-letter/ats-checker' ||
        location.pathname === '/cover-letter/ats_checker' ||
        location.pathname === '/cover-letter/customizer' ||
        location.pathname === '/cover-letter-customizer' ||
        location.pathname === '/cover-letter/jd-builder' ||
        location.pathname === '/resume/customizer' ||
        location.pathname.startsWith('/resume/customizer/') ||
        location.pathname.startsWith('/portfolio-maker/edit') ||
        location.pathname.startsWith('/portfolio-maker/preview');

    if (isNoHeaderFooterPage) {
        return <Outlet />;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: '1 0 auto', paddingTop: '80px' }}>
                <Outlet />
            </div>
            <HomeFooter />
        </div>
    );
}
