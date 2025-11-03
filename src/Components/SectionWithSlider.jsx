 import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SectionWithSlider = () => {
  // 🔹 Custom Arrow Components
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-red-900 p-2 rounded-full cursor-pointer hover:scale-110 transition"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-red-900 p-2 rounded-full cursor-pointer hover:scale-110 transition"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );

  // 🔹 Slider Settings
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2500,
    slidesToShow: 5,
    slidesToScroll: 1,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 4 } },
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-yellow-50 py-16 overflow-hidden relative">
      {/* 🔹 Section Title */}
      <div className="flex justify-center items-center mb-10">
        <div className="flex items-center space-x-4">
          <span className="w-20 border-t-4 border-red-700 rounded-full"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-red-800 uppercase tracking-wide">
            Section Title
          </h2>
          <span className="w-20 border-t-4 border-red-700 rounded-full"></span>
        </div>
      </div>

      {/* 🔹 Slider Area */}
      <div className="relative px-8 md:px-16">
        <Slider {...settings}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="px-2">
              <div className="bg-white h-56 rounded-2xl shadow-md flex items-center justify-center hover:shadow-xl transition">
                <p className="text-gray-400 text-sm">Product {index + 1}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SectionWithSlider;
