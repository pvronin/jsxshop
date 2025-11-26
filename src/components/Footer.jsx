import { Link } from 'react-router-dom';
import { FaStore, FaInstagram, FaTwitter, FaFacebookF, FaTelegram, FaWhatsapp } from 'react-icons/fa';

// 💡 یک کامپوننت کمکی برای لینک‌های فوتر تا کد تمیزتر باشد
const FooterLink = ({ to, children }) => (
    <li>
        <Link
            to={to}
            className="text-slate-300 hover:text-white hover:underline transition-colors duration-200"
        >
            {children}
        </Link>
    </li>
);

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="container mx-auto px-6 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {/* ستون اول: لوگو و توضیحات */}
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-3 text-white text-2xl font-bold group">
                            {/* 💡 استفاده از استایل لوگوی هدر */}
                            <div className="bg-blue-600/50 p-2 rounded-xl group-hover:bg-blue-500/50 transition-colors">
                                <FaStore className="text-white text-xl" />
                            </div>
                            <span className="text-xl">فروشگاه آنلاین</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            بهترین محصولات را با بهترین کیفیت و قیمت از ما بخواهید. ما به رضایت شما متعهدیم.
                        </p>
                    </div>

                    {/* ستون دوم: دسترسی سریع */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">دسترسی سریع</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/">خانه</FooterLink>
                            <FooterLink to="/shop">فروشگاه</FooterLink>
                            <FooterLink to="/cart">سبد خرید</FooterLink>
                            <FooterLink to="/profile">پروفایل من</FooterLink>
                        </ul>
                    </div>

                    {/* ستون سوم: اطلاعات */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">اطلاعات ما</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/about">درباره ما</FooterLink>
                            <FooterLink to="/contactus">تماس با ما</FooterLink>
                            <FooterLink to="/privacy_policy">سیاست حفظ حریم خصوصی</FooterLink>
                            <FooterLink to="/terms">شرایط و ضوابط</FooterLink>
                        </ul>
                    </div>

                    {/* ستون چهارم: شبکه‌های اجتماعی */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">ما را دنبال کنید</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            در شبکه‌های اجتماعی همراه ما باشید.
                        </p>
                        {/* 💡 کلاس space-x-reverse برای چینش صحیح آیکون‌ها در حالت راست‌چین */}
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://www.instagram.com/alih._.exe?igsh=NTUwZjM3ZHc5c2t1"
                                className="text-slate-300 hover:text-white transition-colors p-2 bg-slate-700 hover:bg-slate-600 rounded-full"
                                aria-label="اینستاگرام"
                            >
                                <FaInstagram className="text-2xl" />
                            </a>
                            <a
                                href="t.me/Warshade"
                                className="text-slate-300 hover:text-white transition-colors p-2 bg-slate-700 hover:bg-slate-600 rounded-full"
                                aria-label="توییتر"
                            >
                                <FaTelegram className="text-2xl" />
                            </a>
                            <a
                                href="https://wa.me/qr/MBSQMQHUXE7GD1"
                                className="text-slate-300 hover:text-white transition-colors p-2 bg-slate-700 hover:bg-slate-600 rounded-full"
                                aria-label="فیسبوک"
                            >
                                <FaWhatsapp className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* بخش کپی‌رایت */}
                <div className="mt-12 pt-6 border-t border-slate-700 text-center text-slate-400 text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} فروشگاه آنلاین. تمامی حقوق محفوظ است.
                    </p>
                </div>
            </div>
        </footer>
    );
}
