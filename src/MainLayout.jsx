import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;
