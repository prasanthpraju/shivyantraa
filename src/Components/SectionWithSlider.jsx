 import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SectionPagedGrid = () => {
<<<<<<< HEAD
  const totalItems = 16;
  const items = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `Rudraksha Mala ${i + 1}`,
    image: `https://images.unsplash.com/photo-1580201904802-97a8c6a97d4a?auto=format&fit=crop&w=600&q=60&sig=${i}`,
  }));

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) setItemsPerPage(4);
      else if (window.innerWidth < 1024) setItemsPerPage(6);
      else setItemsPerPage(8);
=======
  // Total items
  const totalItems = 32; // change as needed
  const items = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  // Responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(16); // desktop default
  const [page, setPage] = useState(0);

  // Update itemsPerPage on resize
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(8); // 2 cols x 4 rows
      } else {
        setItemsPerPage(16); // 4 cols x 4 rows
      }
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
<<<<<<< HEAD
  const handleNext = () => setPage((p) => (p + 1) % totalPages);
  const handlePrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const currentItems = items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  return (
    <section className="relative bg-gradient-to-b from-[#2c0a05] via-[#3d0f08] to-[#1c0703] py-16 overflow-hidden">
      {/* Ornamental background overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] opacity-10"></div>

      {/* Section title */}
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
      <div className="relative z-10 px-4 sm:px-10 lg:px-20">
        <div
          className={`grid gap-8 ${
            itemsPerPage <= 4
              ? "grid-cols-2"
              : itemsPerPage <= 6
              ? "grid-cols-3"
              : "grid-cols-4"
=======

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentItems = items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  return (
    <section className="bg-gradient-to-r from-[#310502] via-[#420303] to-[#3d0101] py-12 md:py-16 relative">
      {/* Section Title */}
      <div className="flex justify-center items-center mb-10">
        <div className="flex items-center space-x-3 md:space-x-4">
          <span className="w-12 md:w-30 border-t-4 border-[#d4af37] rounded-full"></span>
          <h2 className="text-xl md:text-3xl font-bold text-[#f7f7f7] uppercase tracking-wide text-center">
            Our Products
          </h2>
          <span className="w-12 md:w-30 border-t-4 border-[#d4af37] rounded-full"></span>
        </div>
      </div>

      {/* Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 z-20 bg-[#d4af37] text-black p-3 rounded-full shadow-lg hover:bg-[#b9931b] hover:scale-110 transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 z-20 bg-[#d4af37] text-black p-3 rounded-full shadow-lg hover:bg-[#b9931b] hover:scale-110 transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Grid */}
      <div className="px-3 sm:px-6 md:px-16">
        <div
          className={`grid gap-6 ${
            itemsPerPage === 8 ? "grid-cols-2 grid-rows-4" : "grid-cols-4 grid-rows-4"
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
          }`}
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
<<<<<<< HEAD
              className="group relative bg-[#fdf9f3] border border-[#d4af37]/40 rounded-2xl shadow-md hover:shadow-[#d4af37]/60 transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#4b1a09] group-hover:text-[#b48c22] transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Blessed • Handcrafted</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#2a0301]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-[#f8e1b4]">
                <p className="text-lg font-semibold mb-3 tracking-wide">View Details</p>
                <button className="px-5 py-2 bg-[#d4af37] text-[#2a0301] rounded-full font-medium hover:bg-[#b48c22] transition">
                  Explore
                </button>
              </div>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] via-[#ffdf8a] to-[#d4af37]"></div>
            </div>
          ))}
        </div>

        {/* Page indicator */}
        <div className="mt-12 text-center text-[#e6c177] font-medium tracking-wide">
          Page {page + 1} / {totalPages}
        </div>
=======
              className="bg-[#fef9e7] rounded-2xl shadow-md hover:shadow-[#d4af37]/50 transition-all duration-300 flex items-center justify-center h-40 md:h-44 cursor-pointer transform hover:-translate-y-2 hover:scale-105 text-[#310502] font-semibold text-lg"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicator */}
      <div className="mt-6 text-center text-[#f7f7f7] font-medium">
        Page {page + 1} of {totalPages}
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
      </div>
    </section>
  );
};

export default SectionPagedGrid;
