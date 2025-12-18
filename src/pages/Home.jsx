import { Link } from "react-router-dom";
import { FaStar, FaShoppingCart, FaTruck, FaShieldAlt, FaBolt, FaArrowRight, FaArrowLeft, FaRegHeart, FaSearch, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import myPhoto from "../assets/undraw_shopping-bags_nfsf.png";
import axios from "axios";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import ProductCard from "../components/shop/ProductCard";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await axios.get('https://dummyjson.com/products?limit=12');
            const data = response.data;
            setProducts(data.products);

            // انتخاب 4 محصول به عنوان محصولات ویژه
            setFeaturedProducts(data.products.slice(0, 4));
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            {/* هدر اصلی با طراحی مدرن */}
            <section className="relative py-28 px-6 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
                <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="space-y-12"
                    >
                        <span className="inline-block bg-yellow-300 text-blue-900 font-semibold px-4 py-2 rounded-xl shadow-md text-sm">ارسال رایگان برای سفارش‌های امروز</span>


                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                            یک خرید
                            <span className="text-yellow-300"> راحت، سریع و امن </span>
                            را تجربه کنید
                        </h1>


                        <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                            انتخاب محصولات با بهترین قیمت و دریافت سریع درب منزل.
                        </p>


                        <div className="flex gap-4 mt-6">
                            <Link to="/shop" className="bg-white text-blue-800 px-8 py-4 rounded-xl font-semibold shadow-xl hover:bg-blue-100 transition-all">
                                مشاهده محصولات
                            </Link>


                            <Link to="/offers" className="bg-yellow-300 text-blue-900 px-8 py-4 rounded-xl font-semibold shadow-xl hover:bg-yellow-400 transition-all">
                                تخفیف‌های ویژه
                            </Link>
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex justify-center"
                    >
                        <img src={myPhoto} alt="hero" className="w-full max-w-2xl drop-shadow-xl p-4 backdrop-blur-3xl rounded-4xl shadow-2xl border border-white/20" />
                    </motion.div>
                </div>
            </section>

            {/* بنر تبلیغاتی */}
            <section className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 py-4 text-center font-bold text-lg shadow-lg">
                <div className="container mx-auto flex items-center justify-center gap-3 animate-pulse">
                    <FaBolt className="text-xl" />
                    <span>فقط امروز: خرید بالای 200 هزار تومان - ارسال رایگان!</span>
                </div>
            </section>

            {/* بخش امکانات */}
            <section className="py-20 px-6 bg-slate-100">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
                            چرا ما را انتخاب می‌کنید؟
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            ما بهترین خدمات را برای رضایت شما ارائه می‌دهیم
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[{
                            icon: <FaTruck className="text-3xl" />,
                            title: "ارسال فوق‌سریع",
                            desc: "تحویل در کمتر از 24 ساعت در شهرهای بزرگ"
                        }, {
                            icon: <FaShieldAlt className="text-3xl" />,
                            title: "گارانتی اصالت کالا",
                            desc: "تمام محصولات دارای ضمانت اصالت و کیفیت"
                        }, {
                            icon: <FaStar className="text-3xl" />,
                            title: "رضایت بالای مشتریان",
                            desc: "با بیش از 10 هزار مشتری راضی"
                        }, {
                            icon: <FaShoppingCart className="text-3xl" />,
                            title: "تجربه خرید امن",
                            desc: "پرداخت امن با چندین درگاه معتبر"
                        }].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.2 }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center border border-slate-200 group"
                            >
                                <div className="text-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h4 className="font-bold text-lg text-slate-800 mb-2">{f.title}</h4>
                                <p className="text-slate-600 text-sm">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* محصولات ویژه */}
            <section className="py-20 px-6 bg-white">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
                            محصولات ویژه
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            منتخبی از بهترین محصولات با بیشترین تخفیف
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <ProductCard item={product} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            مشاهده همه محصولات
                            <FaArrowLeft />
                        </Link>
                    </div>
                </div>
            </section>

            {/* اسلایدر محصولات جدید */}
            <section className="py-20 px-6 bg-slate-100">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
                            جدیدترین محصولات
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            تازه‌ترین محصولات اضافه شده به فروشگاه
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                className="swiper-prev-btn w-12 h-12 z-10 absolute top-1/2 -translate-y-1/2 right-0 p-3 rounded-full bg-white/40 text-slate-800 shadow-lg hover:bg-slate-100 transition-all mr-2 hidden md:flex items-center justify-center border border-slate-200"
                            >
                                <FaArrowRight />
                            </button>

                            <button
                                className="swiper-next-btn w-12 h-12 z-10 absolute top-1/2 -translate-y-1/2 left-0 p-3 rounded-full bg-white/40 text-slate-800 shadow-lg hover:bg-slate-100 transition-all ml-2 hidden md:flex items-center justify-center border border-slate-200"
                            >
                                <FaArrowLeft />
                            </button>

                            <Swiper
                                modules={[Pagination, Autoplay, Navigation]}
                                spaceBetween={30}
                                loop={true}
                                centeredSlides={false}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                speed={800}
                                pagination={{
                                    clickable: true,
                                    el: '.swiper-pagination',
                                    renderBullet: function (index, className) {
                                        return '<span class="' + className + '">' + '</span>';
                                    },
                                }}
                                navigation={{
                                    prevEl: '.swiper-prev-btn',
                                    nextEl: '.swiper-next-btn',
                                }}
                                slidesPerGroup={2}
                                breakpoints={{
                                    640: { slidesPerView: 2, spaceBetween: 20 },
                                    768: { slidesPerView: 3, spaceBetween: 30 },
                                    1024: { slidesPerView: 4, spaceBetween: 30 },
                                }}
                                className="w-full h-auto !p-16"
                            >
                                {products.map((product) => (
                                    <SwiperSlide key={product.id} className="pb-12">
                                        <ProductCard item={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Pagination سفارشی */}
                            <div className="swiper-pagination flex justify-center gap-2 mt-6"></div>
                        </div>
                    )}
                </div>
            </section>

            {/* بخش تماس و پشتیبانی */}
            <section className="bg-white">

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 md:p-12 text-white text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">نیاز به کمک دارید؟</h3>
                    <p className="mb-6 max-w-2xl mx-auto">تیم پشتیبانی ما 24/7 آماده پاسخگویی به سوالات شماست</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href="tel:+989150647572" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                            <FaPhone />
                            تماس با پشتیبانی
                        </a>
                        <a href="mailto:emeil.seyyed.arm@gmail.com" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
                            <FaEnvelope />
                            ارسال ایمیل
                        </a>
                    </div>
                </div>

            </section>

            {/* خبرنامه */}
            <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="container mx-auto text-center max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-extrabold mb-4">در خبرنامه ما عضو شوید</h3>
                        <p className="text-slate-300 text-lg mb-8">
                            از جدیدترین تخفیف‌ها، محصولات جدید و رویدادهای ویژه باخبر شوید.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="آدرس ایمیل شما"
                                className="flex-1 p-4 rounded-xl text-slate-800 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-yellow-400 text-slate-900 px-6 py-4 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl">
                                عضویت
                            </button>
                        </div>
                        <p className="text-slate-400 text-sm mt-4">
                            با عضویت، با <Link to="/privacy_policy" className="text-blue-300 hover:underline">سیاست حریم خصوصی</Link> ما موافقت می‌کنید.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
