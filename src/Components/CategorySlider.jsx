 import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const sliderRef = useRef(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://shivyantra.onrender.com/api/categories?populate=*"
        );
        const data = res.data?.data || [];
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

<<<<<<< HEAD
  // ✅ Auto-scroll effect (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current && cardRef.current) {
        const scrollAmount = cardRef.current.offsetWidth + 24;
        sliderRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });

        // loop back to start if near end
        if (
          sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
          sliderRef.current.scrollWidth - 50
        ) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3500); // every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

=======
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
  const scroll = (direction) => {
    if (!sliderRef.current || !cardRef.current) return;
    const scrollAmount = cardRef.current.offsetWidth + 24;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ Navigate to Shop page with category + subcategories in URL
  const handleCategoryClick = (category) => {
    const name = category?.Name || "Unknown";
    const subCats = category?.subcategories?.map((s) => s.text) || [];
    const query = new URLSearchParams();
    query.set("category", name);
    if (subCats.length) query.set("sub", subCats.join(","));
    navigate(`/shop?${query.toString()}`);
  };

  if (!categories.length) {
    return (
      <section className="py-16 text-center">
        <p className="text-lg font-semibold">Loading categories...</p>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-r from-[#310502] via-[#420303] to-[#3d0101] py-16 overflow-hidden">
<<<<<<< HEAD
      {/* Heading */}
=======
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#f7f7f7] uppercase tracking-wide relative inline-block">
          Explore Categories
          <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-30 border-b-4 border-[#d4af37] rounded-full"></span>
        </h2>
      </div>

<<<<<<< HEAD
      {/* Slider */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-6 px-6 md:px-12 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
=======
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-6 px-6 md:px-12 overflow-x-auto no-scrollbar scroll-smooth"
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
        >
          {categories.map((item, idx) => {
            const imageUrl =
              item?.CategoryImage?.[0]?.url ||
              "https://via.placeholder.com/300x200.png?text=Category";

            return (
              <div
                key={item.id || idx}
                ref={idx === 0 ? cardRef : null}
                onClick={() => handleCategoryClick(item)}
<<<<<<< HEAD
                className="min-w-[220px] md:min-w-[260px] bg-[#fef9e7] rounded-2xl shadow-lg hover:shadow-[#d4af37]/40 transition-transform duration-500 hover:-translate-y-2 cursor-pointer flex-shrink-0 group snap-start"
=======
                className="min-w-[220px] md:min-w-[260px] bg-[#fef9e7] rounded-2xl shadow-lg hover:shadow-[#d4af37]/40 transition-transform duration-500 hover:-translate-y-2 cursor-pointer flex-shrink-0 group"
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={imageUrl}
                    alt={item?.Name || "Category"}
                    className="w-full h-55 md:h-70 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#420303]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-[#d4af37] bg-[#310502] w-full uppercase tracking-wide rounded-md py-1">
                    {item?.Name || "Unknown"}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 z-20 bg-[#d4af37] text-black p-2 rounded-full shadow-md hover:bg-[#b9931b] transition"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 z-20 bg-[#d4af37] text-black p-2 rounded-full shadow-md hover:bg-[#b9931b] transition"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
};

export default CategorySlider;
