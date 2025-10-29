 import React from "react";
import { useNavigate } from "react-router-dom";
import blogImg1 from "../../../src/assets/blog1.png";
import blogImg2 from "../../../src/assets/blog2.png";
import blogImg3 from "../../../src/assets/blog3.png";
import blogImg4 from "../../../src/assets/blog4.png";
import blogImg5 from "../../../src/assets/blog5.png";
import blogImg6 from "../../../src/assets/blog6.png";

const blogData = [
  {
    id: 1,
    title: "Power of Panchmukhi Rudraksha: Balance & Protection",
    image: blogImg1,
    description:
      "The Panchmukhi Rudraksha is known to bring calmness, clarity, and strength to its wearer. It helps balance the five elements within the body...",
  },
  {
    id: 2,
    title: "How to Identify Genuine Rudraksha Beads",
    image:  blogImg2,
    description:
      "With the popularity of Rudraksha increasing, so have counterfeit versions. Learn how to identify real Rudraksha beads using simple yet powerful methods...",
  },
  {
    id: 3,
    title: "Spiritual Benefits of Wearing Rudraksha Daily",
    image: blogImg3,
    description:
      "Rudraksha is not just a spiritual ornament — it’s a tool for energy purification, inner peace, and connection with higher consciousness...",
  },
  {
    id: 4,
    title: "Importance of Rudraksha in Meditation Practice",
    image:  blogImg4,
    description:
      "Rudraksha helps stabilize the mind during deep meditation, channeling energy effectively for higher awareness and consciousness...",
  },
  {
    id: 5,
    title: "The Science Behind Rudraksha Energy Vibrations",
    image:  blogImg5,
    description:
      "Scientific studies show Rudraksha beads have natural electromagnetic properties that help regulate body energy and reduce stress...",
  },
  {
    id: 6,
    title: "Choosing the Right Rudraksha for Your Zodiac Sign",
    image: blogImg6,
    description:
      "Different Rudraksha types correspond to various planets and zodiac energies. Learn which one best aligns with your astrological chart...",
  },
];

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-red-900 mb-10">
        Rudraksha Insights & Guides
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            onClick={() => navigate(`/blog/${blog.id}`)} // ✅ Navigate to detail page
            className="cursor-pointer bg-white border border-red-100 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-100 object-cover rounded-t-2xl"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-red-900 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-700 text-sm">{blog.description}</p>
              <button className=" mt-6 bg-red-900 text-yellow-100 px-4 py-2 rounded-lg hover:bg-red-800 transition-all">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
