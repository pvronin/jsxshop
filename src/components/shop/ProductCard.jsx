// components/shop/ProductCard.jsx
import { Link } from "react-router-dom";
import AddToCartBtn from "../AddToCartBtn";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ item }) {
    return (
        <div className="flex flex-col relative justify-between bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border border-gray-200 overflow-hidden">
            <div className="absolute top-2 right-2 bg-blue-500 rounded-lg p-2 flex items-center justify-center text-sm text-white font-bold">
                {item.discountPercentage}%
            </div>
            <Link to={`/shop/products/${item.id}`}>
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-contain p-4 bg-gray-50 border-b border-gray-100"
                />
            </Link>
            <div className="p-5">
                <h3 className="font-extrabold md:text-xl text-gray-900 mb-2 truncate">
                    {item.title}
                </h3>
                <p className="text-sm text-emerald-600 font-medium mb-3">
                    {item.brand}
                </p>

                <div className="flex justify-between items-center mb-4 pt-3 border-t border-gray-100">
                    <span className="text-lg md:text-xl font-black text-red-600">
                        ${item.price}
                    </span>
                    <div className="text-sm font-medium text-gray-600 flex flex-col items-end">
                        <span className='flex items-center gap-2 text-yellow-500'>
                            {item.rating} <FaStar className="-mt-1" />
                        </span>
                    </div>
                </div>

                <AddToCartBtn item={item} />
            </div>
        </div>
    );
}
