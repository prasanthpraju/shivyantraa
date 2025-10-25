 import React, { useState, useEffect } from "react";

const TopSlider = () => {
  const toplines = [
    "Limited Time Offer: 30% Off on Rudraksham Ceilings",
    "Exclusive Rudraksham Ceiling Designs - Limited Stock!",
    "Get Free Shipping on Orders Above $100!"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % toplines.length);
    }, 2000); // Change slide every 3 sec

    return () => clearInterval(interval);
  }, [toplines.length]);

  return (
    <div className="w-full relative h-10 bg-white flex justify-center items-center text-sm">
      <h2 className="text-center text-black px-4 font-medium">
        {toplines[currentIndex]}
      </h2>
    </div>
  );
};

export default TopSlider;
