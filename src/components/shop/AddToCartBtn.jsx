import { decrement, increment } from "../../store/slices/Cartslice";
import { useDispatch, useSelector } from "react-redux";
import { TiMinus, TiPlus } from "react-icons/ti";
import { MdAddShoppingCart } from "react-icons/md";


const AddToCartBtn = ({ item }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const cartItem = cart?.find((c) => c.id === item.id);
    // اگر cartItem وجود داره یعنی محصول در سبد خرید هست
    return cartItem ? (
        <div className="h-15 flex justify-between items-center gap-4 bg-gray-100 p-3 rounded-full border border-gray-200">
            <button
                onClick={() => dispatch(decrement({ id: item.id }))}
                className="bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center w-11 h-11 rounded-full transition duration-150 shadow-md"
            >
                <TiMinus size={20} />
            </button>
            <span className="font-black text-2xl text-gray-800">
                {cartItem.qty}
            </span>
            <button
                onClick={() => dispatch(increment({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    thumbnail: item.thumbnail
                }))}
                className="bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center w-11 h-11 rounded-full font-bold transition duration-150 shadow-md"
            >
                <TiPlus size={20} />
            </button>
        </div>
    ) : (
        <button
            onClick={() => dispatch(increment({
                id: item.id,
                title: item.title,
                price: item.price,
                thumbnail: item.thumbnail,
                rating: item.rating,
                stock: item.stock,
                discountPercentage: item.discountPercentage
            }))}
            className="w-full flex justify-center items-center gap-3 h-15 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl text-sm md:text-base font-bold transition duration-200 transform hover:scale-[1.01] shadow-lg shadow-blue-200/50"
        >
            افزودن به سبد<MdAddShoppingCart  size={18}/>
        </button>
    );
};

export default AddToCartBtn;
