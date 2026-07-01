// src/components/header/MegaMenu.jsx
import { Link } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import { useClickOutside } from '../../hooks/useClickOutside';

export default function MegaMenu({ categories, isOpen, setIsOpen, location }) {
  const menuRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative group ml-1 md:ml-2" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          location.pathname.includes('shop')
            ? 'bg-white text-blue-600 shadow-md'
            : 'text-blue-100 hover:bg-white/20 hover:text-white'
        }`}
      >
        <FaStore className="text-base md:text-lg" />
        <span>فروشگاه</span>
      </button>

      <div
        className={`
          absolute top-full right-0 mt-2 w-78 md:w-92 bg-white rounded-2xl shadow-2xl p-3 z-50
          transition-all duration-300 origin-top-right
          md:group-hover:opacity-100 md:group-hover:visible md:group-hover:scale-100
          ${isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
        `}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
          <span className="font-bold text-gray-400">دسته‌بندی‌ها</span>
          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {categories?.length || 0}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {categories?.map((cat, index) => (
            <Link
              key={index}
              to={`/shop/${cat}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-xs md:text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-2 rounded-lg transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>{cat}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
