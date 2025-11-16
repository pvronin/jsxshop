import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import { Login_Register } from './pages/Login_Regiser'
import MainLayout from './MainLayout'

function App() {

    return (
        <>
            <Routes>

                {/* Layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>

                {/* صفحه بدون هدر/فوتر */}
                <Route path="/login_register" element={<Login_Register />} />

            </Routes>
        </>
    )
}

export default App
