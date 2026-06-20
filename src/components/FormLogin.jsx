import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { toast } from "sonner";


export function FormLogin({ onToggle }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "emilys", // مقدار پیشفرض برای تست سریع‌تر
        password: "emilyspass" // مقدار پیشفرض برای تست سریع‌تر
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 🟦 درخواست گرفتن اطلاعات کامل کاربر
    const fetchUserInfo = async (id) => {
        const { data } = await axios.get(`https://dummyjson.com/users/${id}`);
        console.log(data);

        return data;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // ✅ Mutation برای لاگین
    // 🔵 Mutation لاگین
    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const { data } = await axios.post(
                "https://dummyjson.com/auth/login",
                credentials,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            return data;
        },
        onSuccess: async (data) => {
            // 🔹 ذخیره توکن اولیه
            localStorage.setItem("token", data.token);

            try {
                // 🟢 درخواست دوم برای گرفتن اطلاعات کامل کاربر
                const fullUser = await fetchUserInfo(data.id);

                // 🟢 ذخیره اطلاعات کامل در Redux
                dispatch(setUser({
                    ...fullUser,          // اطلاعات کاملتر
                    token: data.token     // از لاگین گرفته شده
                }));

                localStorage.setItem("user", JSON.stringify({
                    ...fullUser,
                    token: data.token
                }));


                // فرض کنید fullUser را از API دریافت کرده‌اید
                // const userName = fullUser.firstName || "کاربر گرامی";

                toast.success(`خوش آمدید`);

                navigate("/");
            } catch (error) {
                console.error("خطا در گرفتن اطلاعات کامل کاربر:", error);
                toast.error("ورود موفقیت آمیز بود، اما در دریافت اطلاعات کامل خطا رخ داد.");

            }
        },
        onError: (error) => {
            console.error("خطا در ورود:", error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="w-full max-w-sm p-8 rounded-2xl shadow-2xl backdrop-blur-xl bg-white/20 border border-white/10 transition">

            {/* عنوان فرم */}
            <h2 className="text-3xl font-bold text-white text-center mb-6">
                ورود به سیستم
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>

                {/* فیلد نام کاربری (Username/Email) */}
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-white/90 mb-2">
                        نام کاربری یا ایمیل
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="نام کاربری"
                        className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300"
                        required
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                        رمز عبور
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="رمز عبور"
                            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition duration-300"
                            aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
                        >
                            {showPassword ? (
                                // آیکون چشم بسته (وقتی رمز visible است)
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411M9.88 9.88l-3.41-3.41m9.02 9.02l-3.41 3.41M4 4l3.39 3.39m0 0L4 4m3.39 3.39L12 12m0 0l4.61 4.61M12 12l4.61-4.61M12 12L7.39 7.39" />
                                </svg>
                            ) : (
                                // آیکون چشم باز (وقتی رمز hidden است)
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* نمایش خطا */}
                {loginMutation.isError && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                        {loginMutation.error.response?.data?.message || "خطا در ورود. لطفا مجدد تلاش کنید."}
                    </div>
                )}

                {/* دکمه ارسال (Submit Button) */}
                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full py-3 mt-6 bg-white/90 text-blue-800 font-extrabold rounded-lg shadow-lg hover:bg-white transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loginMutation.isPending ? "در حال ورود..." : "ورود"}
                </button>
            </form>


            {/* لینک‌های کمکی */}
            <div className="flex justify-between text-sm mt-4">
                <button type="button" className="text-white/80 hover:text-white transition duration-300">
                    رمز عبور را فراموش کردم؟
                </button>
                <button type="button" onClick={onToggle} className="text-white/80 hover:text-white transition duration-300">
                    ثبت نام
                </button>
            </div>

        </div>
    )
}
