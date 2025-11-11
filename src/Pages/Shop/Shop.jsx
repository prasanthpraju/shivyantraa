 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Shopbg from "../../../src/assets/ii.png";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category") || "";

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [sortOption, setSortOption] = useState("Featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://shivyantra.onrender.com/api/categories?populate[subcategories][populate]=*&populate[products][populate]=*"
        );
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (selectedSubcategory) {
          const res = await axios.get(
            `https://shivyantra.onrender.com/api/subcategories?populate[products][populate]=*&filters[text][$eq]=${selectedSubcategory}`
          );
          const subData = res.data?.data?.[0];
          setProducts(subData?.products || []);
          setSubcategories([]);
        } else if (selectedCategory) {
          const res = await axios.get(
            `https://shivyantra.onrender.com/api/categories?populate[products][populate]=*&populate[subcategories][populate]=*&filters[Name][$eq]=${selectedCategory}`
          );
          const catData = res.data?.data?.[0];
          setProducts(catData?.products || []);
          setSubcategories(catData?.subcategories || []);
        } else {
          const res = await axios.get("https://shivyantra.onrender.com/api/products?populate=*");
          setProducts(res.data?.data || []);
          setSubcategories([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedSubcategory]);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Number(a.Price) || 0;
    const priceB = Number(b.Price) || 0;
    if (sortOption === "Low to High") return priceA - priceB;
    if (sortOption === "High to Low") return priceB - priceA;
    return 0;
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: "#fff",
    color: "#333",
    showClass: { popup: "animate__animated animate__fadeInRight" },
    hideClass: { popup: "animate__animated animate__fadeOutRight" },
  });

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem("refresh_token");
      if (!token) {
        Toast.fire({ icon: "info", title: "Please login to add items to cart 🛒" });
        return;
      }

      const imageUrl =
        product.ProductImage?.[0]?.url || "https://via.placeholder.com/300x250?text=No+Image";

      const payload = {
        ProductName: product.ProductName,
        ProductImage: imageUrl,
        Quantity: 1,
        Price: product.Price,
      };

      await axios.post("https://shivyantra.onrender.com/api/cart", payload, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      Toast.fire({ icon: "success", title: `${product.ProductName} added to cart` });
    } catch (error) {
      console.error("Add to cart error:", error);
      Toast.fire({ icon: "error", title: "Error adding product. Try again!" });
    }
  };

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    setSelectedSubcategory("");
    navigate(`/shop?category=${encodeURIComponent(name)}`);
    setShowMobileFilters(false);
  };

  const handleSubcategorySelect = (sub) => {
    setSelectedSubcategory(sub);
    setShowMobileFilters(false);
  };

  const handleShowAll = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    navigate("/shop");
    setShowMobileFilters(false);
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
      style={{
        backgroundImage: `linear-gradient(rgba(250,245,235,0.92), rgba(241,233,211,0.92)), url(${Shopbg})`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-4 md:p-8 border border-amber-200">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-red-900 mb-1">
                {selectedSubcategory
                  ? `${selectedSubcategory} Products`
                  : selectedCategory
                  ? `${selectedCategory} Products`
                  : "All Products"}
              </h2>
              <p className="text-sm text-amber-800/90">
                Explore premium collections curated for you.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-2 md:gap-4 flex-wrap">
              <label className="font-medium text-sm md:text-base">Sort By:</label>
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
                onClick={() => setShowMobileFilters((prev) => !prev)}
                className="md:hidden bg-amber-700 text-white px-3 py-1 rounded-lg font-medium"
              >
                Filters
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="hidden md:inline-flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-lg shadow hover:brightness-95 transition"
              >
                🛒 View Cart
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Sidebar */}
            <aside
              className={`md:col-span-1 ${showMobileFilters ? "block" : "hidden"} md:block`}
            >
              <div className="sticky top-6 bg-white p-4 rounded-xl shadow-md md:shadow-none md:p-0">
                <h3 className="text-lg font-semibold mb-3 border-b pb-2">Categories</h3>
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
                      <div>
                        <button
                          onClick={() => handleCategorySelect(cat.Name)}
                          className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                            selectedCategory === cat.Name
                              ? "bg-amber-300 text-black"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {cat.Name}
                        </button>

                        {selectedCategory === cat.Name && cat.subcategories?.length > 0 && (
                          <ul className="ml-4 mt-1 space-y-1 border-l border-amber-200 pl-2">
                            {cat.subcategories.map((sub) => (
                              <li key={sub.id}>
                                <button
                                  onClick={() => handleSubcategorySelect(sub.text)}
                                  className={`text-sm w-full text-left px-2 py-1 rounded-md ${
                                    selectedSubcategory === sub.text
                                      ? "bg-amber-200"
                                      : "hover:bg-gray-100"
                                  }`}
                                >
                                  {sub.text}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                          <img
                            src={imageUrl}
                            alt={product.ProductName}
                            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                          />
                        </div>

                        <div className="mt-4 flex justify-between items-start gap-2 md:gap-4">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">{product.ProductName}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.SubTitle || ""}</p>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-amber-800">₹{product.Price}</div>
                            <div className="text-xs text-gray-500">Inclusive of taxes</div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="flex-1 bg-red-950 text-white py-2 rounded-lg font-semibold hover:brightness-95 transition"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-none border border-amber-600 text-amber-700 py-2 px-4 rounded-lg font-semibold hover:bg-amber-50 transition"
                          >
                            Add to cart
                          </button>
                        </div>

                        <span className="absolute top-3 left-3 bg-amber-700 text-amber-50 text-xs font-semibold px-2 py-1 rounded">
                          {product.Badge || "Best Seller"}
                        </span>
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
