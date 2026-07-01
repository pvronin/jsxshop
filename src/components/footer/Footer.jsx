import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import Logo from '../Logo';
import FooterLink from './FooterLink';


export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="container mx-auto px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* ستون اول: لوگو و توضیحات */}
                    <div className="flex flex-col gap-4">
                        <Logo size='xl' />
                        <p className="text-slate-400 text-sm leading-relaxed">
                            بهترین محصولات را با بهترین کیفیت و قیمت از ما بخواهید. ما به رضایت شما متعهدیم.
                        </p>
                    </div>

                    {/* ستون دوم: دسترسی سریع */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">دسترسی سریع</h3>
                        <ul className="space-y-3">
                            <FooterLink link="/">خانه</FooterLink>
                            <FooterLink link="/shop">فروشگاه</FooterLink>
                            <FooterLink link="/cart">سبد خرید</FooterLink>
                            <FooterLink link="/profile">پروفایل من</FooterLink>
                        </ul>
                    </div>

                    {/* ستون سوم: اطلاعات */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">اطلاعات ما</h3>
                        <ul className="space-y-3">
                            <FooterLink link="/about">درباره ما</FooterLink>
                            <FooterLink link="/contactus">تماس با ما</FooterLink>
                            <FooterLink link="/privacy_policy">سیاست حفظ حریم خصوصی</FooterLink>
                            <FooterLink link="/terms">شرایط و ضوابط</FooterLink>
                        </ul>
                    </div>

                    {/* ستون چهارم: شبکه‌های اجتماعی */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">ما را دنبال کنید</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            در شبکه‌های اجتماعی همراه ما باشید.
                        </p>
                        {/* ✅ ۲. به جای space-x-4 از gap-4 استفاده کردم (در RTL بدون مشکل کار میکنه) */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.instagram.com/alih._.exe?igsh=NTUwZjM3ZHc5c2t1"
                                className="text-slate-300 hover:text-white transition-colors p-2 bg-slate-700 hover:bg-slate-600 rounded-full"
                                aria-label="اینستاگرام" // ✅ درست
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram className="text-2xl" />
                            </a>
                            <a
                                href="https://t.me/Warshade" // ✅ ۳. پروتکل https:// اضافه شد
                                className="text-slate-300 hover:text-white transition-colors p-2 bg-slate-700 hover:bg-slate-600 rounded-full"
                                aria-label="تلگرام" // ✅ ۴. باگ aria-label برطرف شد
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTelegram className="text-2xl" />
                            </a>
                            <a
                                href="https://wa.me/qr/MBSQMQHUXE7GD1"
                                className="text-slate-300 hover:text-white transition-colors p-2 bg-slate-700 hover:bg-slate-600 rounded-full"
                                aria-label="واتساپ" // ✅ ۵. باگ aria-label برطرف شد
                                target="_blank"
                                rel="noopener noreferrer"
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
