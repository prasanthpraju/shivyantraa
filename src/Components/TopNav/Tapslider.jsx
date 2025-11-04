 import React from "react";

const TopSlider = () => {
  const toplines = [
    " 30% Off on All Rudraksham Ceilings – Limited Period Offer!",
    " Bring Divine Energy to Your Home with Authentic Rudraksha Designs!",
    " Free Shipping on Orders Above ₹499 – Shop Now!",
    " Crafted with Spiritual Precision — Explore Our Rudraksha Collection!",
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#310502] via-[#420303] to-[#3d0101] text-[#f7f7f7] py-2 border-b shadow-inner">
      <div className="flex whitespace-nowrap animate-marquee">
        {toplines.map((line, index) => (
          <span
            key={index}
            className="mx-10 text-sm sm:text-base font-semibold tracking-widest drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]"
          >
            {line}
          </span>
        ))}
        {/* duplicate set for seamless infinite loop */}
        {toplines.map((line, index) => (
          <span
            key={`dup-${index}`}
            className="mx-10 text-sm sm:text-base font-semibold tracking-widest drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]"
          >
            {line}
          </span>
        ))}
      </div>

      {/* Animation style */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            display: inline-flex;
            animation: marquee 40s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default TopSlider;
