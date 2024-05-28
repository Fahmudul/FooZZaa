import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// Images
import img1 from "../../../assets/home/slide1.jpg";
import img2 from "../../../assets/home/slide2.jpg";
import img3 from "../../../assets/home/slide3.jpg";
import img4 from "../../../assets/home/slide4.jpg";
import img5 from "../../../assets/home/slide5.jpg";
import Subtitle from "../../../Components/Subtitle/Subtitle";

const ProductBanner = () => {
  return (
    <div className="mb-10">
      <Subtitle
        subheading={"From 11:00am to 10:00pm"}
        heading={"ORDER ONLINE"}
      />
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1} className="w-[350px] h-[500px] " alt="" />
          <h1 className="text-center text-xl font-semibold text-white -mt-20 z-[10]">
            SALAD
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} className="w-[350px] h-[500px] " alt="" />
          <h1 className="text-center text-xl font-semibold text-white -mt-20 z-[10]">
            SOUPS
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} className="w-[350px] h-[500px] " alt="" />
          <h1 className="text-center text-xl font-semibold text-white -mt-20 z-[10]">
            PIZZAS
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} className="w-[350px] h-[500px] " alt="" />
          <h1 className="text-center text-xl font-semibold text-white -mt-20 z-[10]">
            DESERTS
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} className="w-[350px] h-[500px] " alt="" />
          <h1 className="text-center text-xl font-semibold text-white -mt-20 z-[10]">
            SALAD
          </h1>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductBanner;
