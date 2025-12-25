// components/shop/ProductCard.jsx
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../store/slices/Cartslice";
import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const cartItem = cart?.find((c) => c.id === item.id);

    return (

        <div className="flex flex-col justify-between bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border border-gray-200 overflow-hidden">
            <Link to={`/shop/products/${item.id}`}>
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-contain p-4 bg-gray-50 border-b border-gray-100"
                />
            </Link>
            <div className="p-5">
                <h3 className="font-extrabold text-xl text-gray-900 mb-2 truncate">
                    {item.title}
                </h3>
                <p className="text-sm text-emerald-600 font-medium mb-3">
                    {item.brand}
                </p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                    {item.description}
                </p>

                <div className="flex justify-between items-center mb-5 pt-3 border-t border-gray-100">
                    <span className="text-2xl font-black text-red-600">
                        ${item.price}
                    </span>
                    <div className="text-sm font-medium text-gray-600 flex flex-col items-end">
                        <span className='text-yellow-500'>
                            {`⭐ ${item.rating}`}
                        </span>
                        <span className={item.stock > 10 ? 'text-green-500' : 'text-orange-500'}>
                            {`📦 موجود: ${item.stock}`}
                        </span>
                    </div>
                </div>

                {cartItem ? (
                    <div className="flex justify-between items-center gap-4 bg-gray-100 p-1 rounded-full border border-gray-200">
                        <button
                            onClick={() => dispatch(decrement({ id: item.id }))}
                            className="bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full transition duration-150 shadow-md"
                        >
                            -
                        </button>
                        <span className="font-black text-xl text-gray-800">
                            {cartItem.qty}
                        </span>
                        <button
                            onClick={() => dispatch(increment({ id: item.id, name: item.title, price: item.price, image: item.thumbnail }))}
                            className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full font-bold transition duration-150 shadow-md"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => dispatch(increment({ id: item.id, name: item.title, price: item.price, image: item.thumbnail }))}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs md:text-base font-bold transition duration-200 transform hover:scale-[1.01] shadow-lg shadow-blue-200/50"
                    >
                        🛒 افزودن به سبد
                    </button>
                )}
            </div>
        </div>

    );
}
