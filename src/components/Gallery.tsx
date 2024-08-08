"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";

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
        navigation={true}

        modules={[Pagination,Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide>
           
            <div className="flex items-center justify-center relative w-full h-[500px] rounded-md">
              {loading ? (
                <RotatingLines strokeColor="#c55e0c" width="20" />
              ) : (
                ""
              )}
              <Image
                objectFit="cover"
                alt="business-images"
                fill
                className="rounded-md"
                onLoad={() => (
                  <RotatingLines strokeColor="#c55e0c" width="20" />
                )}
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
