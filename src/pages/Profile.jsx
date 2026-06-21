import { useDispatch, useSelector } from "react-redux";


import {
    FaEnvelope,
    FaUser,
    FaMapMarkerAlt,
    FaKey,
    FaTag,
    FaBoxOpen,
    FaShoppingCart,
    FaHeart,
    FaSignOutAlt,
    FaCity,
    FaBuilding,
    FaCreditCard,
    FaUserTag,
    FaHome,
    FaPhone,
    FaWallet,
    FaCalendarAlt,
    FaVenusMars,
    FaIdCard
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { logout } from "../store/slices/userSlice";

export function Profile() {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const totalItems = cart.reduce((total, item) => total + item.qty, 0);


    const handleLogout = () => {
        dispatch(logout());
        toast.success('با موفقیت خارج شدید');
    };

    if (!isAuthenticated || !user) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
            >
                <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">لطفا وارد شوید</h2>
                    <p className="text-gray-600 mb-6">برای مشاهده پروفایل ابتدا وارد حساب خود شوید.</p>
                    <a href="/login_register" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg">
                        ورود / ثبت‌نام
                    </a>
                </div>
            </motion.div>
        );
    }

    const userInfo = {
        // اطلاعات پایه
        firstName: user.firstName || "نامشخص",
        lastName: user.lastName || "نامشخص",
        email: user.email || "example@email.com",
        username: user.username || "نامشخص",
        phone: user.phone || "ثبت نشده",
        gender: user.gender || "ثبت نشده",
        age: user.age || "ثبت نشده",

        // آدرس
        address: user.address?.address || "ثبت نشده",
        city: user.address?.city || "ثبت نشده",
        postalCode: user.address?.postalCode || "ثبت نشده",

        // بانک
        cardNumber: user.bank?.cardNumber || "ثبت نشده",
        iban: user.bank?.iban || "ثبت نشده",

        // نقش
        role: user.role || "کاربر عادی",
    };

    const stats = [
        { count: 12, label: "تعداد سفارش", icon: FaBoxOpen, color: "purple" },
        { count: totalItems, label: "سبد خرید فعال", icon: FaShoppingCart, color: "blue" },
        { count: 45, label: "محصول مورد علاقه", icon: FaHeart, color: "red" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-16">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">

                {/* هدر پروفایل */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white mb-8 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 flex items-center justify-center text-4xl md:text-5xl font-bold border-4 border-white/50 shadow-xl flex-shrink-0">
                                {user.image ? (
                                    <img src={user.image} alt="آواتار" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <span>{userInfo.firstName?.charAt(0)}{userInfo.lastName?.charAt(0)}</span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-4xl font-extrabold">
                                    {userInfo.firstName} {userInfo.lastName}
                                </h1>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-blue-100">
                                    <span className="flex items-center gap-1 text-sm">
                                        <FaUser className="text-xs" />
                                        @{userInfo.username}
                                    </span>
                                    <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <FaEnvelope className="text-xs" />
                                        {userInfo.email}
                                    </span>
                                    <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                                    <span className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                                        <FaUserTag className="text-xs" />
                                        {userInfo.role}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm bg-green-500/30 px-3 py-1 rounded-full">
                                        <FaIdCard className="text-xs" />
                                        تایید شده
                                    </span>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-red-500/90 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-red-500/30 transition-all flex items-center gap-2 w-full md:w-auto justify-center"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt />
                            خروج از حساب
                        </motion.button>
                    </div>
                </motion.div>

                {/* آمار سریع */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -3 }}
                            className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border ${stat.color === 'blue' ? 'border-blue-100' :
                                stat.color === 'purple' ? 'border-purple-100' :
                                    'border-red-100'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-2xl md:text-3xl font-extrabold text-gray-800">{stat.count}</h4>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </div>
                                <stat.icon className={`text-3xl ${stat.color === 'blue' ? 'text-blue-500' :
                                    stat.color === 'purple' ? 'text-purple-500' :
                                        'text-red-500'
                                    }`} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* اطلاعات کامل */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* اطلاعات شخصی */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
                    >
                        <h3 className="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            اطلاعات شخصی
                        </h3>

                        <div className="space-y-4">
                            <InfoItem icon={FaUser} label="نام" value={userInfo.firstName} />
                            <InfoItem icon={FaUser} label="نام خانوادگی" value={userInfo.lastName} />
                            <InfoItem icon={FaEnvelope} label="ایمیل" value={userInfo.email} />
                            <InfoItem icon={FaPhone} label="شماره تماس" value={userInfo.phone} />
                            <InfoItem icon={FaKey} label="نام کاربری" value={`@${userInfo.username}`} />
                            <InfoItem icon={FaVenusMars} label="جنسیت" value={userInfo.gender} />
                            <InfoItem icon={FaCalendarAlt} label="سن" value={`${userInfo.age} سال`} />
                            <InfoItem icon={FaUserTag} label="نقش کاربری" value={userInfo.role} />
                        </div>
                    </motion.div>

                    {/* اطلاعات آدرس */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
                    >
                        <h3 className="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            اطلاعات آدرس
                        </h3>

                        <div className="space-y-4">
                            <InfoItem icon={FaHome} label="آدرس" value={userInfo.address} />
                            <InfoItem icon={FaCity} label="شهر" value={userInfo.city} />
                            <InfoItem icon={FaMapMarkerAlt} label="کد پستی" value={userInfo.postalCode} />
                        </div>
                    </motion.div>

                    {/* اطلاعات بانکی */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
                    >
                        <h3 className="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
                            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                            اطلاعات بانکی
                        </h3>

                        <div className="space-y-4">
                            <InfoItem icon={FaCreditCard} label="شماره کارت" value={userInfo.cardNumber} />
                            <InfoItem icon={FaWallet} label="شماره شبا" value={userInfo.iban} />
                        </div>
                    </motion.div>
                </div>

                {/* فوتر */}
                <div className="mt-6 text-center text-xs text-gray-400">
                    آخرین به‌روزرسانی: {new Date().toLocaleString('fa-IR')}
                </div>
            </div>
        </div>
    );
}

// کامپوننت کمکی برای نمایش اطلاعات
function InfoItem({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
            <div className="text-blue-500 mt-0.5">
                <Icon className="text-lg" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium">{label}</p>
                <p className="text-sm md:text-base font-semibold text-gray-800 break-words">{value}</p>
            </div>
        </div>
    );
}
