<<<<<<< HEAD
 import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all products, find matching one by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          "https://shivyantra.onrender.com/api/products?populate=*"
        );
        const products = res.data?.data || [];

        // find matching product
        const found = products.find((item) => String(item.id) === String(id));

        if (found) {
          setProduct(found);
        } else {
          console.warn("Product not found in list");
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Product not found.
      </div>
    );

  const { ProductName, Price, SubTitle, Description, ProductImage } = product;
  const imageList =
    ProductImage?.map((img) => img.url) ||
    ["https://via.placeholder.com/900x700?text=No+Image"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/70 to-amber-100 py-12">
=======
 import React from "react";

// UI-only Product Details page (no data fetching or business logic)
// Props:
// - product: { id, name, price, images: [url], shortDescription, longDescription, specs: [{k,v}], rating, badges }
// - onAddToCart: fn(id) - optional
// - onBack: fn() - optional

const ProductDetailsAlt = ({ product = null, onAddToCart = () => {}, onBack = () => window.history.back() }) => {
  const mock = {
    id: "alt-001",
    name: "Classic Biryani Spice Kit",
    price: "799",
    rating: 4.7,
    images: [
      "https://via.placeholder.com/900x700?text=Main+Product",
      "https://via.placeholder.com/400x300?text=Side+1",
      "https://via.placeholder.com/400x300?text=Side+2",
      "https://via.placeholder.com/400x300?text=Side+3",
    ],
    shortDescription: "Authentic masala blends for restaurant-style biryani at home.",
    longDescription:
      "This premium biryani spice kit includes hand-roasted whole spices, blended to a signature recipe. Use it for biryanis, pulaos, and gravies. Packaged in an elegant tin for freshness and gifting.",
    specs: [
      { k: "Net Weight", v: "350g" },
      { k: "Servings", v: "10-12" },
      { k: "Storage", v: "Store in cool, dry place" },
    ],
    badges: ["Handpicked", "Chef's Choice"],
  };

  const p = product || mock;

  return (
    <div className="min-h-screen bg-amber-50/60 py-12">
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Gallery */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
<<<<<<< HEAD
              <img
                src={imageList[0]}
                alt={ProductName}
                className="w-full h-[520px] object-cover"
              />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {imageList.map((img, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden border bg-white hover:shadow-md cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
=======
              <img src={p.images?.[0]} alt={p.name} className="w-full h-[520px] object-cover" />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {(p.images || []).map((img, i) => (
                <div key={i} className="rounded-lg overflow-hidden border bg-white hover:shadow-md cursor-pointer">
                  <img src={img} alt={`${p.name}-${i}`} className="w-full h-24 object-cover" />
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
                </div>
              ))}
            </div>

<<<<<<< HEAD
            {/* About Section */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                About this Product
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {Description || "Detailed description will be updated soon."}
              </p>
            </div>
          </div>

          {/* Right: Details */}
          <aside className="lg:col-span-5">
            <div className="sticky top-8 bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-2xl font-extrabold text-red-900">
                {ProductName}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{SubTitle}</p>

              <div className="mt-3 flex items-center gap-3">
                <div className="text-2xl font-bold text-amber-800">
                  ₹{Price}
                </div>
                <div className="text-sm text-gray-500">Inclusive of GST</div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full bg-red-900 text-white py-3 rounded-lg font-semibold hover:brightness-95 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => alert("Buy now clicked")}
                  className="w-full border border-amber-700 text-amber-700 py-3 rounded-lg font-semibold hover:bg-amber-50 transition"
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Free delivery on orders above ₹799 • Easy 7-day return
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => navigate("/shop")}
                  className="text-sm text-amber-900 hover:underline"
                >
                  Back to Shop
                </button>
=======
            {/* Description card */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">About this product</h3>
              <p className="text-gray-600 leading-relaxed">{p.longDescription}</p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {p.specs?.map((s, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="text-amber-800 font-semibold">{s.k}</div>
                    <div className="text-gray-600">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews preview */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">Customer Reviews</h4>
                <div className="text-sm text-amber-800 font-semibold">{p.rating} ★</div>
              </div>

              <div className="mt-4 space-y-4">
                {/* sample review */}
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Arun</div>
                    <div className="text-xs text-gray-500">2 days ago</div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">"Excellent aroma and balanced flavours. Made biryani taste like heaven."</div>
                </div>

                <div className="text-center">
                  <button className="text-amber-900 font-semibold hover:underline">View all reviews</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sticky Purchase Panel */}
          <aside className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-extrabold text-red-900">{p.name}</h2>
                    <p className="text-sm text-gray-600 mt-1">{p.shortDescription}</p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="text-2xl font-bold text-amber-800">₹{p.price}</div>
                      <div className="text-sm text-gray-500">Inclusive of GST</div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {p.badges?.map((b, i) => (
                        <span key={i} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">{b}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="h-16 w-16 bg-amber-100 rounded-lg flex items-center justify-center font-bold text-amber-800">SV</div>
                  </div>
                </div>

                {/* Qty selector (UI-only) */}
                <div className="mt-6 flex items-center gap-3">
                  <label className="text-sm font-medium">Quantity</label>
                  <div className="ml-auto flex items-center gap-2">
                    <button className="px-3 py-1 rounded-md border border-amber-300">-</button>
                    <div className="px-4 py-1 border rounded-md">1</div>
                    <button className="px-3 py-1 rounded-md border border-amber-300">+</button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={() => onAddToCart(p.id)} className="w-full bg-amber-700 text-white py-3 rounded-lg font-semibold hover:brightness-95 transition">Add to Cart</button>
                  <button onClick={() => alert('Buy now clicked (UI only)')} className="w-full border border-amber-700 text-amber-700 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">Buy Now</button>
                </div>

                <div className="mt-4 text-sm text-gray-600">Delivery: Free on orders over ₹799 • Returns within 7 days</div>

                <div className="mt-4 flex gap-3">
                  <button className="flex-1 border rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50">Share</button>
                  <button className="flex-1 border rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50">Wishlist</button>
                </div>

                <div className="mt-4 text-xs text-gray-500">Secure payments • Easy returns</div>
              </div>

              <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
                <h4 className="font-semibold mb-2">Price Details</h4>
                <div className="flex justify-between text-sm text-gray-600"><span>Price</span><span>₹{p.price}</span></div>
                <div className="flex justify-between text-sm text-gray-600"><span>Delivery</span><span>₹0</span></div>
                <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-gray-800"><span>Total</span><span>₹{p.price}</span></div>
              </div>

              <div className="mt-4 text-center">
                <button onClick={onBack} className="text-sm text-amber-900 hover:underline">Back to shop</button>
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ProductDetails;
=======
export default ProductDetailsAlt;
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
