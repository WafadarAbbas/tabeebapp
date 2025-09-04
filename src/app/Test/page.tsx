"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Carousel() {
  // Array of slide data
  const slides = [
    { id: 1, title: "Slide 1" },
    { id: 2, title: "Slide 2" },
    { id: 3, title: "Slide 3" },
    { id: 4, title: "Slide 4" },
    { id: 5, title: "Slide 5" },
    { id: 6, title: "Slide 6" },
  ];

  return (
    <Swiper spaceBetween={20} slidesPerView={4}>
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} style={{cursor:"pointer"}}>
          <div className="p-6 bg-blue-100 rounded-lg text-center">{slide.title}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
