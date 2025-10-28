 import React, { useState, useEffect } from "react";

const TopSlider = () => {
  const toplines = [
    "✨ 30% Off on All Rudraksham Ceilings – Limited Period Offer!",
    "🏡 Elevate Your Space with Authentic Rudraksham Designs!",
    "🚚 Free Shipping on Orders Above ₹499!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % toplines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [toplines.length]);

  return (
    <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 text-yellow-100 text-center py-2 text-sm font-medium tracking-wide">
      {toplines[currentIndex]}
    </div>
  );
};

export default TopSlider;
