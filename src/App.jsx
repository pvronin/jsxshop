import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import LoadingSpinner from './components/LoadingSpinner';
import { Profile } from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Product from './pages/Product';
import { Test } from './pages/Test';


const Home = lazy(() => import('./pages/Home'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy_policy = lazy(() => import('./pages/Privacy_policy'));
const Contactus = lazy(() => import('./pages/Contactus'));
const About = lazy(() => import('./pages/About'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Login_Register = lazy(() => import('./pages/Login_Register'));
const MainLayout = lazy(() => import('./MainLayout'));

function App() {

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ScrollToTop />
            <Routes>

                {/* صفحات با Layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contactus" element={<Contactus />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy_policy" element={<Privacy_policy />} />
                    <Route path="/test" element={<Test />} />



              // مسیر را اینگونه اصلاح کنید تا تداخلی با صفحه اصلی شاپ نداشته باشد
                    <Route path="/shop">
                        <Route index element={<Shop />} />
                        <Route path="products/:id" element={<Product />} />
                        <Route path="*" element={<Shop />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/cart" element={<Cart />} />
                    </Route>

                    {/* <Route path="/shop/*" element={<CategoryRouter />} /> */}
                </Route>

                {/* صفحه بدون Layout */}
                <Route path="/login_register" element={<Login_Register />} />

            </Routes>
        </Suspense>
    );
}

export default App;
