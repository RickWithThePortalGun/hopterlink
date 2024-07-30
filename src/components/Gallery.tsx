"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: any;
}
const Gallery = ({ images }: Props) => {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide>
            <div className="flex items-center justify-center relative w-full h-[500px] rounded-md">
              {loading ? <p>Loading...</p> : ""}
              <Image
                objectFit="cover"
                alt="business-images"
                fill
                className="rounded-md"
                onLoad={() => setLoading(false)}
                src={image.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
