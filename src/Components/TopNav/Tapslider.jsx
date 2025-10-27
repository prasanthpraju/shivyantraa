import React, { useState, useEffect } from "react";

const Tapslider = () => {
  const toplines = [
    "Limited Time Offer: 30% Off on Rudraksham Ceilings",
    "Exclusive Rudraksham Ceiling Designs - Limited Stock!",
    "Get Free Shipping on Orders Above $100!",
  ];

  const [currentindex, setcurrentindex] = useState(0);

  useEffect(() => {
    const intervel = setInterval(() => {
      setcurrentindex((prev) => (prev + 1) % toplines.length);
    }, 2000);

    return () => clearInterval(intervel);
  }, [toplines.length]);

  return (
    <div className="w-full relative h-10 bg-white flex justify-center items-center text-sm">
      <h2 className="text-center text-black px-4 font-medium">
        {toplines[currentindex]}
      </h2>
    </div>
  );
};

export default Tapslider;
