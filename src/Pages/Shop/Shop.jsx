 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold mb-4 md:mb-0">
          {selectedCategory ? `${selectedCategory} Products` : "All Products"}
        </h2>
        <div className="flex items-center">
          <label className="font-medium mr-2">Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
          >
            <option value="Featured">Featured</option>
            <option value="Low to High">Price: Low to High</option>
            <option value="High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 border-r pr-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Categories</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={handleShowAll}
                className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-[#d4af37] text-black"
                    : "hover:bg-gray-100"
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategorySelect(cat.Name)}
                  className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                    selectedCategory === cat.Name
                      ? "bg-[#d4af37] text-black"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat.Name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-4">
          {sortedProducts.length === 0 ? (
            <p className="text-center py-20 text-gray-500 text-lg">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => {
                const imageUrl =
                  product.ProductImage?.[0]?.url ||
                  "https://via.placeholder.com/300x250?text=No+Image";
                return (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105"
                  >
                    <img
                      src={imageUrl}
                      alt={product.ProductName}
                      className="w-full h-56 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">{product.ProductName}</h3>
                    <p className="text-gray-600 font-medium mb-2">₹{product.Price}</p>
                    <button className="w-full bg-[#d4af37] text-black py-2 rounded-md font-semibold hover:bg-[#b8972b] transition">
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
