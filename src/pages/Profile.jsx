import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";
// 💡 آیکون‌های اضافی برای زیبایی و کاربرد
import { FaEnvelope, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaKey, FaTag, FaBoxOpen, FaShoppingCart, FaHeart } from "react-icons/fa";

export function Profile() {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // 💡 شبیه سازی داده های آماری (چون در Redux وجود ندارند)
    const stats = [
        { count: 12, label: "تعداد سفارش", color: "purple" },
        { count: 3, label: "سبد خرید فعال", color: "blue" },
        { count: 45, label: "محصول مورد علاقه", color: "yellow" },
    ];

    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/30 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">لطفا وارد شوید</h2>
                    <p className="text-gray-600">برای مشاهده پروفایل ابتدا وارد حساب خود شوید.</p>
                </div>
            </div>
        );
    }

    // 💡 تعیین تاریخ فرضی برای زمان پیوستن (برای مثال)
    const joinDate = "فروردین ۱۴۰۲";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-16">
            <div className="container mx-auto px-6 max-w-5xl"> {/* 💡 max-w را کمی بزرگتر کردم */}

                {/* کارت پروفایل */}
                <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/40">

                    {/* هدر */}
                    <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white">
                        <div className="flex items-center gap-6 mb-6 md:mb-0">

                            {/* آواتار */}
                            {/* 💡 اضافه کردن یک تصویر کوچک به آواتار (اگر user.image وجود داشته باشد) */}
                            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold shadow-lg backdrop-blur-xl border border-white/40 overflow-hidden">
                                {user.image ? (
                                    <img src={user.image} alt="آواتار کاربر" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        {user.firstName?.charAt(0)}
                                        {user.lastName?.charAt(0)}
                                    </>
                                )}
                            </div>

                            <div>
                                <h1 className="text-3xl font-extrabold tracking-wide">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-blue-100 mt-1 text-sm">@{user.username}</p>
                                <p className="text-blue-200 mt-2 text-xs font-light flex items-center gap-1">
                                    <FaTag className="text-xs" />
                                    <span>عضویت از: {joinDate}</span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <button
                                className="bg-red-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg
                                hover:bg-red-600 transition-colors duration-200"
                                onClick={() => dispatch(logout())}
                            >
                                <span className="flex items-center gap-2">
                                    <FaKey />
                                    خروج از حساب
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* 💡 بخش جدید: آمار سریع */}
                    <div className="bg-white/90 p-8 border-b border-gray-200">
                        <div className="grid grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <StatsBox key={index} {...stat} />
                            ))}
                        </div>
                    </div>

                    {/* بخش جزئیات */}
                    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* اطلاعات شخصی */}
                        <div>
                            <h3 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-3 border-b pb-2 border-indigo-100">
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                مشخصات فردی
                            </h3>

                            <div className="space-y-1">
                                <ProfileItem label="نام" value={user.firstName} icon={FaUser} />
                                <ProfileItem label="نام خانوادگی" value={user.lastName} icon={FaUser} />
                                <ProfileItem label="ایمیل" value={user.email} icon={FaEnvelope} />
                                <ProfileItem label="شماره تماس" value={user.phone} icon={FaPhoneAlt} />
                                <ProfileItem label="نام کاربری" value={"@" + user.username} icon={FaKey} />
                            </div>
                        </div>

                        {/* اطلاعات حساب و آدرس */}
                        <div>
                            <h3 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-3 border-b pb-2 border-indigo-100">
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                اطلاعات حساب و آدرس
                            </h3>

                            <div className="space-y-6">
                                {/* کارت نقش */}
                                <CardBox
                                    title="نقش حساب کاربری"
                                    value={user.role || "کاربر عمومی"}
                                    color="blue"
                                />

                                {/* کارت آدرس */}
                                <CardBox
                                    title={<span className="flex items-center gap-2"><FaMapMarkerAlt /> آدرس ثبت شده</span>}
                                    value={
                                        <>
                                            <p>{user?.address?.address || "آدرس ثبت نشده است"}</p>
                                            <p className="mt-2 text-sm text-opacity-80">
                                                شهر: {user?.address?.city || "-"} - کد پستی: {user?.address?.postalCode || "-"}
                                            </p>
                                        </>
                                    }
                                    color="green"
                                />

                                <CardBox
                                    title="نوع حساب"
                                    value={"حساب فعال"}
                                    color="blue"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

/* کامپوننت‌های کمکی زیبا (با اصلاحات) */

function ProfileItem({ label, value, icon: Icon }) {
    return (
        <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-b-0">
            {/* 💡 آیکون در سمت راست */}
            <div className={`text-xl ${Icon ? 'text-indigo-500' : 'text-transparent'}`}>
                {Icon && <Icon />}
            </div>

            <div className="flex-1">
                <p className="text-sm text-gray-500 font-normal">{label}</p>
                <p className="text-lg font-extrabold text-gray-900">{value}</p>
            </div>
        </div>
    );
}

function CardBox({ title, value, color }) {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-800 border-blue-300",
        green: "bg-green-50 text-green-800 border-green-300"
    };

    return (
        // 💡 اضافه کردن shadow-lg
        <div className={`p-5 rounded-xl border shadow-lg ${colorClasses[color]}`}>
            <p className="text-sm opacity-80 font-medium">{title}</p>
            <div className="mt-2 text-lg font-bold">{value}</div>
        </div>
    );
}

// 💡 کامپوننت StatsBox اضافه شده
function StatsBox({ count, label, color }) {
    const colorClasses = {
        blue: "text-blue-600 bg-blue-100",
        yellow: "text-yellow-600 bg-yellow-100",
        purple: "text-purple-600 bg-purple-100",
    };

    return (
        <div className={`text-center p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow ${colorClasses[color]} border border-white`}>
            <h4 className="text-4xl font-extrabold mb-1">{count}</h4>
            <p className="text-sm font-semibold opacity-80">{label}</p>
        </div>
    );
}
