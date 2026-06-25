import { useState } from "react";
import { increment } from "../../store/slices/Cartslice";
import { useDispatch } from "react-redux";
import { TiMinus, TiPlus } from "react-icons/ti";
import { MdAddShoppingCart } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

const AddToCartBtn = ({ item, quantity = 1 }) => {
    const dispatch = useDispatch();

    // State برای نمایش پیام موقت
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        // دیسپچ اکشن افزایش
        dispatch(increment({
            id: item.id,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
            rating: item.rating,
            stock: item.stock,
            discountPercentage: item.discountPercentage,
            quantity: quantity
        }));

        // فعال کردن پیام موفقیت
        setIsAdded(true);

        // بعد از ۲ ثانیه، پیام را مخفی کن
        setTimeout(() => {
            setIsAdded(false);
        }, 4000);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`w-full flex justify-center items-center gap-3 h-14 ${isAdded ? "bg-emerald-400 hover:bg-emerald-500" : "bg-blue-600 hover:bg-blue-700"}   text-white px-6 py-4 rounded-xl text-sm md:text-base font-bold transition duration-200 transform hover:scale-[1.01] shadow-lg shadow-blue-200/50`}
        >
            {isAdded ? (
                // محتوای دکمه وقتی محصول اضافه شد
                <>
                   به سبد افزوده شد <span><FaCircleCheck /></span>
                </>
            ) : (
                // محتوای معمولی دکمه
                <>
                    افزودن به سبد
                    <MdAddShoppingCart size={18} />
                </>
            )}
        </button>
    );
};

export default AddToCartBtn;
