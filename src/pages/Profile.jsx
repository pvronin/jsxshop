import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";

export function Profile() {
    const { user, isAuthenticated } = useSelector((state) => state.user);

    const dispatch = useDispatch();

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-12">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* کارت پروفایل */}
                <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden border border-white/40">

                    {/* هدر */}
                    <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white">
                        <div className="flex items-center gap-6">

                            {/* آواتار */}
                            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold shadow-lg backdrop-blur-xl border border-white/40">
                                {user.firstName?.charAt(0)}
                                {user.lastName?.charAt(0)}
                            </div>

                            <div>
                                <h1 className="text-3xl font-extrabold tracking-wide">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-blue-100 mt-1 text-sm">@{user.username}</p>
                            </div>
                        </div>
                        <div>
                            <button
                                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow
               hover:bg-red-600 transition-colors duration-200"
                                onClick={() => dispatch(logout())} // 💡 باید اکشن خروج را اینجا dispatch کنید
                            >
                                خروج
                            </button>
                        </div>

                    </div>

                    {/* بخش جزئیات */}
                    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* اطلاعات شخصی */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                اطلاعات شخصی
                            </h3>

                            <div className="space-y-4">
                                <ProfileItem label="نام" value={user.firstName} />
                                <ProfileItem label="نام خانوادگی" value={user.lastName} />
                                <ProfileItem label="ایمیل" value={user.email} />
                                <ProfileItem label="شماره تماس" value={user.phone} />
                                <ProfileItem label="نام کاربری" value={"@" + user.username} />
                            </div>
                        </div>

                        {/* اطلاعات حساب */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                اطلاعات حساب
                            </h3>

                            <div className="space-y-4">
                                <CardBox
                                    title="نقش"
                                    value={user.role || "کاربر"}
                                    color="blue"
                                />

                                <CardBox
                                    title="شماره تماس"
                                    value={user.phone}
                                    color="blue"
                                />

                                <CardBox
                                    title="آدرس"
                                    value={
                                        <>
                                            <p>آدرس : {user?.address?.address}</p>
                                            <p>شهر : {user?.address?.city}</p>
                                            <p>کد پستی : {user?.address?.postalCode}</p>
                                        </>
                                    }
                                    color="green"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

/* کامپوننت‌های کمکی زیبا */

function ProfileItem({ label, value }) {
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-lg font-medium text-gray-900">{value}</p>
        </div>
    );
}

function CardBox({ title, value, color }) {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-800 border-blue-200",
        green: "bg-green-50 text-green-800 border-green-200"
    };

    return (
        <div className={`p-5 rounded-xl border ${colorClasses[color]}`}>
            <p className="text-sm opacity-70">{title}</p>
            <div className="mt-1 text-lg font-semibold">{value}</div>
        </div>
    );
}
