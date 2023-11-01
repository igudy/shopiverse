import React from "react";
import { story } from "../data/data";

import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import StoriesCard from "./sub-components/StoriesCard";

const TopStories = () => {
  return (
    <>
      <p className="relative text-5xl sm:text-4xl sm:mb-2 font-extrabold my-10">
        {story.title}
      </p>
      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={true}
          modules={[Pagination, Navigation]}
          scrollbar={{ draggable: true }}
          breakpoints={{
            375: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            550: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            767: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            991: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {story?.news?.map((item, i) => (
            <SwiperSlide key={i} className="flex justify-center cursor-pointer">
              <StoriesCard
                title={item.title}
                text={item.text}
                img={item.img}
                url={item.url}
                like={item.like}
                time={item.time}
                by={item.by}
                btn={item.btn}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default TopStories;
