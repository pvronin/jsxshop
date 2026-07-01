// src/components/header/SearchBar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { RiArrowRightWideFill } from 'react-icons/ri';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useDebounce } from '../../hooks/useDebounce';
import { productApi } from '../../services/productApi';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const clearResults = () => setSearchResults([]);
  const searchRef = useClickOutside(clearResults);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.length > 2) {
        setIsSearching(true);
        try {
          const response = await productApi.getBySearch(debouncedSearch);
          setSearchResults(response.data.products || []);
        } catch (error) {
          console.error('خطا در جستجو:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  return (
    <div className="flex-1 max-w-36 xs:max-w-none md:max-w-md relative mx-1" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="جستجو ..."
          className="w-full bg-white/10 border border-blue-400/20 text-white placeholder-blue-200 text-[10px] md:text-sm rounded-lg py-2 px-7 md:px-10 focus:bg-white focus:text-blue-900 focus:outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-blue-200 text-[10px] md:text-sm" />
        {isSearching && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-200 text-xs">
            ...
          </span>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-2xl overflow-hidden z-[60] min-w-3xs">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              to={`/shop/products/${product.id}`}
              onClick={() => {
                setSearchTerm('');
                setSearchResults([]);
              }}
              className="flex items-center justify-between gap-4 p-3 hover:bg-blue-50 border-b border-blue-100 last:border-0 group transition-all"
            >
              <div className="flex items-center gap-2">
                <img
                  src={product.thumbnail}
                  alt=""
                  className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                />
                <div className="flex flex-col gap-2">
                  <span className="text-sm md:text-base font-medium text-gray-800 line-clamp-1">
                    {product.title}
                  </span>
                  <span className="text-xs md:text-sm text-blue-600 font-bold">
                    ${product.price}
                  </span>
                </div>
              </div>
              <RiArrowRightWideFill className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-blue-600" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
