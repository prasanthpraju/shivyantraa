 import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SectionPagedGrid = () => {
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
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

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
          }`}
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
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
      </div>
    </section>
  );
};

export default SectionPagedGrid;
