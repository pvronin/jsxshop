import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function Carousel() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000 }}
    >
      <SwiperSlide>
        <img src="../assets/undraw_shopping-bags_nfsf.png" className='h-3' />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../assets/person-holding-various-sizes-black-shopping-bags.webp" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/img/3.jpg" />
      </SwiperSlide>
    </Swiper>
  );
}
