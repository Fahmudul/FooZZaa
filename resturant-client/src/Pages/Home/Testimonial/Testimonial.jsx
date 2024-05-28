import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  FreeMode,
} from "swiper/modules";
import "swiper/css/autoplay";
import Subtitle from "../../../Components/Subtitle/Subtitle";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import commma from "./comma.svg";
import { useEffect, useState } from "react";
const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div>
      <Subtitle heading="TESTIMONIALS" subheading="What Our Clients Say" />
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {reviews.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="flex flex-col items-center gap-5 min-h-[400px]">
              <Rating
                value={item.rating}
                readOnly
                style={{ maxWidth: "180px", marginTop: "45px" }}
                //   emptySymbol={<img src={startempty} className="icon w-8" />}
                //   fullSymbol={<img src={starfull} className="icon w-8" />}
              />
              <img src={commma} alt="" />
              <p className="text-center max-w-[1080px]">{item.details}</p>
              <p>{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
