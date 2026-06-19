import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import {FaArrowRight, FaArrowLeft} from "react-icons/fa";
import { motion } from "framer-motion";
import ProductCard from './shop/ProductCard';

export default function Carousel({items}) {
    return (
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
                slidesPerGroup={1} // پیش‌فرض برای موبایل
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}

                className="w-full h-auto !p-6"
            >
                {items.map((item, index) => (
                    <SwiperSlide key={item.id} className="pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.5,
                                delay: (index % 4) * 0.1
                            }}
                        >
                            <ProductCard item={item} />
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination سفارشی */}
            <div className="swiper-pagination flex justify-center gap-2"></div>
        </div>
    );
}
