 import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        console.log("🟡 Fetching slider data...");
        const res = await axios.get(
          "https://shivyantra.onrender.com/api/home-sliders?populate[ImageName][fields][0]=url"
        );

        console.log("🟢 Full API Response:", res);

        const data = res.data?.data || [];
        console.log("📦 Extracted 'data' array:", data);

        const cleanData = data.map((item) => ({
          id: item.id,
          name: item.Name || "Untitled",
          image: item.ImageName?.url || "",
        }));

        console.log("✅ Mapped cleanData (final slides):", cleanData);

        setSlides(cleanData);
      } catch (error) {
        console.error("❌ Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [slides]);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-lg text-red-800 font-semibold">
        Loading slider...
      </div>
    );

  if (slides.length === 0)
    return <div className="text-center text-gray-600 py-10">No slider images found.</div>;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="w-full flex-shrink-0 h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px]"
          >
            {console.log("🖼️ Rendering slide:", s)}
            <img
              src={s.image}
              alt={s.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full"
      >
        ❯
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === i ? "bg-red-700 scale-125" : "bg-gray-400/70 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
