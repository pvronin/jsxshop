import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import LoadingSpinner from './components/LoadingSpinner';
import { Profile } from './pages/Profile';
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Login_Register = lazy(() => import('./pages/Login_Register'));
const MainLayout = lazy(() => import('./MainLayout'));

function App() {
    return (
        <Suspense fallback={<LoadingSpinner/>}>
            <Routes>

                {/* صفحات با Layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* صفحه بدون Layout */}
                <Route path="/login_register" element={<Login_Register />} />

            </Routes>
        </Suspense>
    );
}

export default App;
