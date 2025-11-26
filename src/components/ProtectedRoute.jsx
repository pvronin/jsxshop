import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    // فرض بر این است که وضعیت لاگین را در ریداکس دارید
    const { user } = useSelector((state) => state.user);

    // اگر کاربر لاگین نبود، بفرستش صفحه لاگین
    return user ? <Outlet /> : <Navigate to="/login_register" replace />;
};

export default ProtectedRoute;
