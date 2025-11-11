 import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

// Import all 16 images
import rudraksha1 from "../../src/assets/1.webp";
import rudraksha2 from "../../src/assets/2.webp";
import rudraksha3 from "../../src/assets/3.webp";
import rudraksha4 from "../../src/assets/4.webp";
import rudraksha5 from "../../src/assets/5.webp";
import rudraksha6 from "../../src/assets/6.webp";
import rudraksha7 from "../../src/assets/7.webp";
import rudraksha8 from "../../src/assets/8.webp";
import rudraksha9 from "../../src/assets/9.webp";
import rudraksha10 from "../../src/assets/10.webp";
import rudraksha11 from "../../src/assets/11.webp";
import rudraksha12 from "../../src/assets/12.webp";
import rudraksha13 from "../../src/assets/13.webp";
import rudraksha14 from "../../src/assets/14.webp";
import rudraksha15 from "../../src/assets/15.webp";
import rudraksha16 from "../../src/assets/16.webp";

const SectionPagedGrid = () => {
  const navigate = useNavigate();

  const items = [
    { id: 1, name: "Rudraksha Mala 1", image: rudraksha1 },
    { id: 2, name: "Rudraksha Mala 2", image: rudraksha2 },
    { id: 3, name: "Rudraksha Mala 3", image: rudraksha3 },
    { id: 4, name: "Rudraksha Mala 4", image: rudraksha4 },
    { id: 5, name: "Rudraksha Mala 5", image: rudraksha5 },
    { id: 6, name: "Rudraksha Mala 6", image: rudraksha6 },
    { id: 7, name: "Rudraksha Mala 7", image: rudraksha7 },
    { id: 8, name: "Rudraksha Mala 8", image: rudraksha8 },
    { id: 9, name: "Rudraksha Mala 9", image: rudraksha9 },
    { id: 10, name: "Rudraksha Mala 10", image: rudraksha10 },
    { id: 11, name: "Rudraksha Mala 11", image: rudraksha11 },
    { id: 12, name: "Rudraksha Mala 12", image: rudraksha12 },
    { id: 13, name: "Rudraksha Mala 13", image: rudraksha13 },
    { id: 14, name: "Rudraksha Mala 14", image: rudraksha14 },
    { id: 15, name: "Rudraksha Mala 15", image: rudraksha15 },
    { id: 16, name: "Rudraksha Mala 16", image: rudraksha16 },
  ];

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) setItemsPerPage(4); // Mobile: 2x2 grid
      else if (window.innerWidth < 1024) setItemsPerPage(6); // Tablet
      else setItemsPerPage(8); // Desktop
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () =>
    setPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentItems = items.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <section className="relative bg-gradient-to-b from-[#2c0a05] via-[#3d0f08] to-[#1c0703] py-16 overflow-hidden">
      <div className="relative z-10 text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-[#e6c177] tracking-wider uppercase drop-shadow-md">
          Sacred Rudraksha Collection
        </h2>
        <p className="text-[#f7f3e9]/80 mt-3 text-sm md:text-base italic">
          Pure. Powerful. Spiritual.
        </p>
        <div className="flex justify-center mt-5">
          <div className="w-24 border-t-4 border-[#d4af37] rounded-full"></div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-3 md:left-10 -translate-y-1/2 z-20 bg-[#d4af37] text-[#2a0301] p-3 rounded-full shadow-xl hover:bg-[#b48c22] hover:scale-110 transition"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-3 md:right-10 -translate-y-1/2 z-20 bg-[#d4af37] text-[#2a0301] p-3 rounded-full shadow-xl hover:bg-[#b48c22] hover:scale-110 transition"
      >
        <ChevronRight size={26} />
      </button>

      {/* Grid */}
      <div
        {...swipeHandlers}
        className="relative z-10 px-4 sm:px-10 lg:px-20"
        style={{ touchAction: "pan-y" }} // important for mobile swipe
      >
        <div
          className={`grid gap-8 ${
            itemsPerPage <= 4
              ? "grid-cols-2"
              : itemsPerPage <= 6
              ? "grid-cols-3"
              : "grid-cols-4"
          }`}
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#fdf9f3] border border-[#d4af37]/40 rounded-2xl shadow-md hover:shadow-[#d4af37]/60 transition-all duration-500 overflow-hidden"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#4b1a09] group-hover:text-[#b48c22] transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Blessed • Handcrafted
                </p>
              </div>
              <div className="absolute inset-0 bg-[#2a0301]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-[#f8e1b4]">
                <p className="text-lg font-semibold mb-3 tracking-wide">
                  View Details
                </p>
                <button
                  onClick={() => navigate(`/rudraksha/${item.id}`)}
                  className="px-5 py-2 bg-[#d4af37] text-[#2a0301] rounded-full font-medium hover:bg-[#b48c22] transition"
                >
                  Explore
                </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] via-[#ffdf8a] to-[#d4af37]"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-[#e6c177] font-medium tracking-wide">
          Page {page + 1} / {totalPages}
        </div>
      </div>
    </section>
  );
};

export default SectionPagedGrid;
