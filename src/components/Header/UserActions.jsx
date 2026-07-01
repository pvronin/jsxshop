// src/components/header/UserActions.jsx
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

export default function UserActions() {
  const cart = useSelector((state) => state.cart.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="flex items-center gap-1 md:gap-3 shrink-0">
      <NavLink to="/cart" className="relative p-2 text-blue-100 hover:bg-white/20 rounded-lg">
        <FaShoppingCart className="text-lg md:text-xl" />
        {totalQuantity > 0 &&(
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] md:text-[10px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center font-bold">
            {totalQuantity < 10 ? totalQuantity : ("+9")}
          </span>
        )}
      </NavLink>

      <NavLink
        to={isAuthenticated ? '/profile' : '/login_register'}
        className="relative p-1.5 md:p-2 text-blue-100 hover:bg-white/20 rounded-lg"
      >
        <FaUserCircle className="text-xl md:text-2xl" />
        {isAuthenticated && (
          <span className="absolute top-1 right-1 w-2 h-2 md:top-1.5 md:right-1.5 bg-green-500 border-2 border-blue-600 rounded-full" />
        )}
      </NavLink>
    </div>
  );
}
