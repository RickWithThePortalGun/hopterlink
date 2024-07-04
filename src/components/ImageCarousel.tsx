import Image from "next/image";
import React from "react";
import AverageReview from "./AverageReview";

const highlightSlides = [
  {
    id: 1,
    imageSrc: "/medium-shot-smiley-woman-desk.jpg",
    textList: ["Discover real expertise.", "Angela Yuo", "Fashion Designer"],
    Stars: 4.5,
    imageDuration: 4,
  },
];

const ImageCarousel = () => {
  return (
    <div className="flex items-center">
      {highlightSlides.map((list) => (
        <div key={list.id} className="sm:pr-20 pr-10" id="slider">
          <div
            className="image-carousel_container2 flex-center rounded-3xl
              overflow-hidden bg-black relative"
          >
            <Image
              src={list.imageSrc}
              alt={list.textList[0]}
              layout="fill"
              objectFit="cover"
            />
            <div
              className="absolute top-12 left-[5%] z-10 glassmorphism p-4 flex gap-4
                flex-col"
            >
              <div>
                <p className="text-md text-start font-bold">Angela Yuo</p>
                <p className="text-start font-bold text-xs">
                  Virtual Assistant
                </p>
              </div>
              <AverageReview size={12} value={list.Stars} />
            </div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
