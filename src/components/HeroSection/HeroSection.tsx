
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper/modules";
const HeroSection = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={1000}
      className="mySwiper"
    >
      <SwiperSlide className="relative">
        <img
          src="https://i.ibb.co/N6cbntn/cute-little-boy-planting-tree-park.jpg"
          alt="slide1"
        />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <img
          src="https://i.ibb.co/XkPMKQ3/child-learning-how-plant-tree.jpg"
          alt="slide2"
        />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <img
          src="https://i.ibb.co/ySR86q0/kids-learnign-about-environment.jpg"
          alt="slide1"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSection;
