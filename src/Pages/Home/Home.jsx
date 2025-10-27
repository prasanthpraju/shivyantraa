 import React, { useEffect, useState } from "react";
import api from "../../Utils/api";

const Home = () => {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const res = await api.get(
          "/api/pages/1?populate[0]=Slider&populate[1]=Slider.Image&populate[2]=Slider.MobileImage"
        );
        const pageData = res.data?.data;
        const slider = pageData?.attributes?.Slider || [];
        setSliderData(slider);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlider();
  }, []);

  useEffect(() => {
    if (sliderData.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sliderData.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [sliderData]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sliderData.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderData.length);
  };

  const getImageUrl = (item) => {
    const url =
      item?.Image?.data?.attributes?.url ||
      item?.Image?.url ||
      item?.MobileImage?.data?.attributes?.url ||
      "";
    if (!url)
      return "https://via.placeholder.com/1200x400?text=No+Image";
    return url.startsWith("http")
      ? url
      : `https://api.shivyantra.com${url}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-lg font-semibold text-yellow-600">
        Loading Slider...
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {sliderData.length > 0 ? (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px]">
          <div
            className="flex transition-transform duration-700 ease-in-out flex-nowrap"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {sliderData.map((item, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 flex justify-center items-center bg-[#f5f5f5]"
              >
                <img
                  src={getImageUrl(item)}
                  alt={`slider-${i}`}
                  loading="lazy"
                  className="max-w-none w-auto h-full transition-transform duration-700 ease-in-out"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    minWidth: "100%",
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition"
          >
            ❯
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {sliderData.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  index === currentIndex
                    ? "bg-red-700 scale-125"
                    : "bg-gray-400/70 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 py-10">
          No slider data found
        </p>
      )}
    </div>
  );
};

export default Home;
