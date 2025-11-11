import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import all images
import rudraksha1 from "../../src/assets/1.webp";
import rudraksha2 from "../../src/assets/2.webp";
import rudraksha3 from "../../src/assets/3.webp";
import rudraksha4 from "../../src/assets/4.webp";
import rudraksha5 from "../../src/assets/5.webp";
import rudraksha6 from "../../src/assets/6.webp";
import rudraksha7 from "../../src/assets/7.webp";
import rudraksha8 from "../../src/assets/8.webp";
import rudraksha9 from "../../src/assets/9.webp";
import rudraksha10 from "../../src/assets/10.webp";
import rudraksha11 from "../../src/assets/11.webp";
import rudraksha12 from "../../src/assets/12.webp";
import rudraksha13 from "../../src/assets/13.webp";
import rudraksha14 from "../../src/assets/14.webp";
import rudraksha15 from "../../src/assets/15.webp";
import rudraksha16 from "../../src/assets/16.webp";

const items = [
  { id: "1", name: "Rudraksha Mala 1", image: rudraksha1, description: "Blessed and handcrafted for spiritual energy." },
  { id: "2", name: "Rudraksha Mala 2", image: rudraksha2, description: "Purity and power combined for meditation." },
  { id: "3", name: "Rudraksha Mala 3", image: rudraksha3, description: "Perfect for focus and mindfulness." },
  { id: "4", name: "Rudraksha Mala 4", image: rudraksha4, description: "Traditional handcrafted sacred beads." },
  { id: "5", name: "Rudraksha Mala 5", image: rudraksha5, description: "Blessings of peace and positive energy." },
  { id: "6", name: "Rudraksha Mala 6", image: rudraksha6, description: "Spiritual guide for meditation and wellness." },
  { id: "7", name: "Rudraksha Mala 7", image: rudraksha7, description: "High-quality sacred beads for devotion." },
  { id: "8", name: "Rudraksha Mala 8", image: rudraksha8, description: "Handcrafted with care for spiritual practices." },
  { id: "9", name: "Rudraksha Mala 9", image: rudraksha9, description: "Purity, energy, and protection combined." },
  { id: "10", name: "Rudraksha Mala 10", image: rudraksha10, description: "Ideal for meditation and focus." },
  { id: "11", name: "Rudraksha Mala 11", image: rudraksha11, description: "Spiritual energy and balance." },
  { id: "12", name: "Rudraksha Mala 12", image: rudraksha12, description: "Handcrafted with devotion." },
  { id: "13", name: "Rudraksha Mala 13", image: rudraksha13, description: "Blessed beads for peace and meditation." },
  { id: "14", name: "Rudraksha Mala 14", image: rudraksha14, description: "Enhances spiritual well-being." },
  { id: "15", name: "Rudraksha Mala 15", image: rudraksha15, description: "Traditional sacred beads." },
  { id: "16", name: "Rudraksha Mala 16", image: rudraksha16, description: "Perfect gift for spiritual seekers." },
];

const RudrakshaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = items.find((i) => i.id === id);

  if (!item) return <p className="text-center py-20 text-gray-600">Item not found.</p>;

  return (
    <section className="min-h-screen bg-[#fdf9f3] py-16 px-4 md:px-20 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 max-w-md md:max-w-lg">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
        />
      </div>
      <div className="flex-1 max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4b1a09] mb-4">{item.name}</h1>
        <p className="text-gray-700 text-lg mb-6">{item.description}</p>
        <p className="text-amber-700 font-semibold text-2xl mb-6">₹999</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#d4af37] text-[#2a0301] px-6 py-3 rounded-full font-semibold hover:bg-[#b48c22] transition mb-4"
        >
          ← Back to Collection
        </button>
        <button
          onClick={() => alert("Added to cart!")}
          className="ml-4 bg-[#4b1a09] text-[#f8e1b4] px-6 py-3 rounded-full font-semibold hover:bg-[#2a0301] transition"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default RudrakshaDetails;
