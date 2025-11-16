import { useState } from "react";

export function FormLogin({ onToggle }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="w-full max-w-sm p-8 rounded-2xl shadow-2xl backdrop-blur-xl bg-white/20 border border-white/10 transition">

            {/* عنوان فرم */}
            <h2 className="text-3xl font-bold text-white text-center mb-6">
                ورود به سیستم
            </h2>



            <form className="space-y-5">

                {/* فیلد نام کاربری (Username/Email) */}
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-white/90 mb-2">
                        نام کاربری یا ایمیل
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="نام کاربری"
                        className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300"
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
                            placeholder="رمز عبور"
                            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300"
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

                {/* دکمه ارسال (Submit Button) */}
                <button
                    type="submit"
                    className="w-full py-3 mt-6 bg-white/90 text-blue-800 font-extrabold rounded-lg shadow-lg hover:bg-white transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    ورود
                </button>
            </form>

            {/* لینک‌های کمکی (اختیاری) */}
            <div className="flex justify-between text-sm mt-4">
                <a href="#" className="text-white/80 hover:text-white transition duration-300">
                    رمز عبور را فراموش کردم؟
                </a>
                <a href="#" onClick={onToggle} className="text-white/80 hover:text-white transition duration-300">
                    ثبت نام
                </a>
            </div>

        </div>
    )
}
