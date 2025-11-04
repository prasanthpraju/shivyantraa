 import React, { useState, useRef, useEffect } from "react";
import { Filter, X } from "lucide-react";
// import productImg from "../../assets/rudraksha1.webp"; // sample product image

const Shop = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterOpen]);

  return (
    <div className="min-h-screen bg-[#fdf8f2] text-[#3b1d0f] relative overflow-hidden">
      {/* ===== Header ===== */}
      <section className="w-full bg-white py-10 text-center font-bold text-red-900 shadow-md">
        <h1 className="text-3xl md:text-4xl font-semibold font-extrabold uppercase tracking-wide">
          Our Shop
        </h1>
        <p className=" text-red-950 mt-2">
          Explore Authentic Rudraksha & Spiritual Products
        </p>
      </section>

      {/* ===== Main Section ===== */}
      <div className="flex flex-col md:flex-row gap-6 p-6 md:p-10 relative">
        {/* ===== Filter Sidebar ===== */}
        {/* Overlay background (mobile only) */}
        {filterOpen && (
          <div className="fixed inset-0 bg-black/30 z-30 md:hidden" />
        )}

        <aside
          ref={filterRef}
          className={`fixed md:static z-40 top-0 left-0 h-full md:h-auto w-3/4 md:w-64 bg-[#fbf2e8] md:bg-transparent shadow-lg md:shadow-none p-6 md:p-0 transform transition-transform duration-300 ${
            filterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          {/* Close Button (Mobile) */}
          <button
            onClick={() => setFilterOpen(false)}
            className="absolute top-4 right-4 md:hidden text-[#5b2a0c]"
          >
            {/* <X size={24} /> */}
          </button>

          <h2 className="text-xl font-semibold mb-4 text-[#4e1f07] uppercase">
            Filters
          </h2>

          <div className="space-y-5 text-sm">
            {/* Category */}
            <div>
              <h3 className="font-medium text-[#3b1d0f] mb-1">Category</h3>
              <ul className="space-y-1">
                <li><input type="checkbox" /> <span>Rudraksha</span></li>
                <li><input type="checkbox" /> <span>Bracelets</span></li>
                <li><input type="checkbox" /> <span>Mala</span></li>
                <li><input type="checkbox" /> <span>Yantra</span></li>
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-[#3b1d0f] mb-1">Price Range</h3>
              <input type="range" className="w-full accent-[#5b2a0c]" />
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-medium text-[#3b1d0f] mb-1">Sort By</h3>
              <select className="w-full p-2 border border-[#d4c3b8] rounded bg-[#fffaf6] text-[#3b1d0f]">
                <option>Featured</option>
                <option>Low to High</option>
                <option>High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* ✅ Done Button (Mobile only) */}
          <button
            onClick={() => setFilterOpen(false)}
            className="mt-8 w-full md:hidden bg-[#5b2a0c] text-white py-2 rounded font-medium hover:bg-[#4e1f07] transition"
          >
            Done
          </button>
        </aside>

        {/* ===== Filter Toggle (Mobile) ===== */}
        <button
          onClick={() => setFilterOpen(true)}
          className="md:hidden flex items-center gap-2 bg-[#5b2a0c] text-white px-4 py-2 rounded shadow-md w-fit z-10"
        >
          <Filter size={18} /> Filters
        </button>

        {/* ===== Products Grid ===== */}
        <main className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#fffaf6] border border-[#e7d9c9] rounded-xl shadow-sm hover:shadow-md transition p-4 text-center"
              >
                <img
                  // src={productImg}
                  alt="Rudraksha"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-[#3b1d0f]">
                  Rudraksha {i + 1}
                </h3>
                <p className="text-sm text-[#4a2b15] mt-1">₹1,200</p>
                <button className="mt-3 bg-[#5b2a0c] hover:bg-[#4e1f07] text-white py-1.5 px-4 rounded text-sm font-medium transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
