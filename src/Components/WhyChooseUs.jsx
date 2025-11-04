 import React, { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Import slick carousel CSS (very important)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// sample client images
import client1 from "../assets/man 7.jpg";
import client2 from "../assets/man.png";
import client3 from "../assets/man6.jpg";
import client4 from "../assets/man5.jpg";
import client5 from "../assets/man3.jpg";
import client6 from "../assets/man6.jpg";

const TestimonialSlider = () => {
  const sliderRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Aarav Patel",
      image: client1,
      quote:
        "Rudraksha quality is outstanding. Their guidance helped me choose the right bead perfectly!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sneha R.",
      image: client2,
      quote:
        "Fast delivery and the authenticity certificate gave me total confidence in my purchase.",
      rating: 5,
    },
    {
      id: 3,
      name: "Vikram Mehta",
      image: client3,
      quote:
        "I appreciate their customer service — they patiently explained the benefits and usage.",
      rating: 5,
    },
    {
      id: 4,
      name: "Joe",
      image: client4,
      quote:
        "Super responsive team. Loved how they guided me personally throughout.",
      rating: 5,
    },
    {
      id: 5,
      name: "Alice",
      image: client5,
      quote: "Excellent quality and packaging — truly worth the price!",
      rating: 5,
    },
    {
      id: 6,
      name: "Mohammed",
      image: client6,
      quote:
        "Very satisfied with the entire experience. Highly recommend!",
      rating: 5,
    },
  ];

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 1200,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // disable default arrows
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="relative bg-gradient-to-r from-[#1e0b07] via-[#2b0f08] to-[#1a0603] text-[#f9f3e7] py-16 px-6 md:px-12 overflow-hidden">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 uppercase tracking-wide text-[#ffffff]">
        What Our Clients Say
      </h2>

      {/* Slider */}
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((t) => (
            <div key={t.id} className="px-3">
              <div className="bg-[#2a0f08] rounded-2xl shadow-md p-6 text-center border border-[#3a1a0c] hover:border-[#d4af37] transition">
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#d4af37] shadow-md"
                  />
                  <div className="flex justify-center text-[#d4af37]">
                    {"⭐".repeat(t.rating)}
                  </div>
                  <p className="text-sm italic text-[#f3e9da] leading-6">
                    “{t.quote}”
                  </p>
                  <h4 className="font-semibold text-lg text-[#f7f7f7] mt-2">
                    {t.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* ✅ Custom Side Buttons */}
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 bg-[#d4af37] text-black p-2 rounded-full hover:bg-[#b9931b] transition shadow-md"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => sliderRef.current.slickNext()}
          className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 bg-[#d4af37] text-black p-2 rounded-full hover:bg-[#b9931b] transition shadow-md"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
};

export default TestimonialSlider;
