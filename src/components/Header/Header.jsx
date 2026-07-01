// src/components/header/Header.jsx (یا همان مسیر قبلی)
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { fetchCategories } from '../../store/slices/CategorySlice';
import Logo from '../Logo';
import MegaMenu from './MegaMenu';
import SearchBar from './SearchBar';
import UserActions from './UserActions';
import { useScrollBehavior } from '../../hooks/useScrollBehavior';

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const categories = useSelector((state) => state.category.categories);
  const [showMegamenu, setShowMegamenu] = useState(false);
  const showWelcome = useScrollBehavior();

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  return (
    <header
      className={`sticky top-0 z-50 shadow-xl transition-transform duration-300 ${
        showWelcome ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-500">
        <nav className="container mx-auto px-2 md:px-4">
          <div className="flex justify-between items-center h-14 md:h-16 gap-2">
            {/* لوگو و منوی فروشگاه */}
            <div className="flex items-center gap-2 md:gap-5">
              <Logo />
              <MegaMenu
                categories={categories}
                isOpen={showMegamenu}
                setIsOpen={setShowMegamenu}
                location={location}
              />
            </div>

            {/* جستجو */}
            <SearchBar />

            {/* سبد خرید و پروفایل */}
            <UserActions />
          </div>
        </nav>
      </div>
    </header>
  );
}
