 import React, { useEffect, useState, useRef } from "react";
import r1 from "../assets/r1.webp";
import r2 from "../assets/r2.jpg";
import r3 from "../assets/r3.webp";
import r4 from "../assets/r4.webp";
import r5 from "../assets/r5.webp";
import r6 from "../assets/r6.webp";
import r7 from "../assets/r7.jpg";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const sliderRef = useRef(null);
  const scrollAnimation = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const data = [
      { id: 1, name: "Electronics", image: r1 },
      { id: 2, name: "Fashion", image: r2 },
      { id: 3, name: "Home", image: r3 },
      { id: 4, name: "Sports", image: r4 },
      { id: 5, name: "Toys", image: r5 },
      { id: 6, name: "Beauty", image: r6 },
      { id: 7, name: "Books", image: r7 },
    ];
    setCategories(data);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollPos = 0;
    const scrollSpeed = 1.2;

    const scroll = () => {
      if (!isPaused.current) {
        scrollPos += scrollSpeed;
        if (scrollPos >= slider.scrollWidth - slider.clientWidth) {
          scrollPos = 0;
        }
        slider.scrollLeft = scrollPos;
      }
      scrollAnimation.current = requestAnimationFrame(scroll);
    };

    scrollAnimation.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(scrollAnimation.current);
  }, [categories]);

  const handleMouseEnter = () => {
    isPaused.current = true;
  };

  const handleMouseLeave = () => {
    isPaused.current = false;
  };

  return (
    <section className="bg-gradient-to-r from-[#310502] via-[#420303] to-[#3d0101] py-16 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#f7f7f7] uppercase tracking-wide relative inline-block">
          Explore Categories
          <span className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-20 border-b-4 border-[#d4af37] rounded-full"></span>
        </h2>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-6 px-6 md:px-12 overflow-x-scroll no-scrollbar"
      >
        {categories.map((item) => (
          <div
            key={item.id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="min-w-[220px] md:min-w-[260px] bg-[#fef9e7] rounded-2xl shadow-lg hover:shadow-[#d4af37]/40 transition-transform duration-500 hover:-translate-y-2 cursor-pointer flex-shrink-0 group"
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-55 md:h-70 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#420303]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-[#d4af37] bg-[#310502] w-full uppercase tracking-wide rounded-md py-1">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySlider;
