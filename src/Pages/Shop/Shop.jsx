 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Shopbg from "../../../src/assets/ii.png"; // matching background

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const initialCategory = searchParams.get("category") || "";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState("Featured");

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://shivyantra.onrender.com/api/categories?populate=*"
        );
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (selectedCategory) {
          const res = await axios.get(
            `https://shivyantra.onrender.com/api/categories?populate[products][populate]=*&filters[Name][$eq]=${selectedCategory}`
          );
          const catData = res.data?.data?.[0];
          const catProducts = catData?.products || [];
          setProducts(catProducts);
        } else {
          const res = await axios.get(
            "https://shivyantra.onrender.com/api/products?populate=*"
          );
          setProducts(res.data?.data || []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Sorting
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Number(a.Price) || 0;
    const priceB = Number(b.Price) || 0;
    if (sortOption === "Low to High") return priceA - priceB;
    if (sortOption === "High to Low") return priceB - priceA;
    return 0; // Featured
  });

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    navigate(`/shop?category=${encodeURIComponent(name)}`);
  };

  const handleShowAll = () => {
    setSelectedCategory("");
    navigate("/shop");
  };

  if (loading)
    return (
      <p className="text-center py-20 text-xl font-semibold text-gray-500">
        Loading products...
      </p>
    );

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover py-16"
      style={{ backgroundImage: `linear-gradient(rgba(250,245,235,0.92), rgba(241,233,211,0.92)), url(${Shopbg})` }}
    >
      <div className="container mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-amber-200">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-red-900 mb-1">
                {selectedCategory ? `${selectedCategory} Products` : "All Products"}
              </h2>
              <p className="text-sm text-amber-800/90">Explore quality items curated for you</p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <label className="font-medium">Sort By:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-amber-200 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-amber-300 focus:outline-none"
              >
                <option value="Featured">Featured</option>
                <option value="Low to High">Price: Low to High</option>
                <option value="High to Low">Price: High to Low</option>
              </select>

              <button
                onClick={() => navigate('/cart')}
                className="hidden md:inline-flex items-center gap-2 bg-amber-700 text-amber-50 px-4 py-2 rounded-lg shadow hover:brightness-95 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16 11V3a1 1 0 00-1-1H5a1 1 0 00-1 1v8H2v2h1l1 5h10l1-5h1v-2h-2zm-3 7H7l-.6-3h6.2L13 18z" />
                </svg>
                View Cart
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-1">
              <div className="sticky top-6">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={handleShowAll}
                      className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                        !selectedCategory ? "bg-amber-300 text-black" : "hover:bg-gray-100"
                      }`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategorySelect(cat.Name)}
                        className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                          selectedCategory === cat.Name ? "bg-amber-300 text-black" : "hover:bg-gray-100"
                        }`}
                      >
                        {cat.Name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Product Grid */}
            <main className="md:col-span-4">
              {sortedProducts.length === 0 ? (
                <p className="text-center py-20 text-gray-500 text-lg">No products found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => {
                    const imageUrl =
                      product.ProductImage?.[0]?.url ||
                      "https://via.placeholder.com/300x250?text=No+Image";

                    return (
                      <div
                        key={product.id}
                        className="group relative border rounded-2xl p-4 shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
                      >
                        <div className="overflow-hidden rounded-lg">
                          <img src={imageUrl} alt={product.ProductName} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg" />
                        </div>

                        <div className="mt-4 flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">{product.ProductName}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.ShortDescription || ''}</p>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-amber-800">₹{product.Price}</div>
                            <div className="text-xs text-gray-500">Inclusive of taxes</div>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-3">
                          <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="flex-1 bg-amber-600 text-white py-2 rounded-lg font-semibold hover:brightness-95 transition"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() => navigate(`/cart/add/${product.id}`)}
                            className="flex-none border border-amber-600 text-amber-700 py-2 px-4 rounded-lg font-semibold hover:bg-amber-50 transition"
                          >
                            Add to Cart
                          </button>
                        </div>

                        {/* badge */}
                        <span className="absolute top-3 left-3 bg-amber-700 text-amber-50 text-xs font-semibold px-2 py-1 rounded">{product.Badge || 'Best Seller'}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
