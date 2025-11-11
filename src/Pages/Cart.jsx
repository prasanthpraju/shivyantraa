<<<<<<< HEAD
 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getToken = () => {
    const token = localStorage.getItem("refresh_token");
    if (!token) {
      setLoading(false);
      navigate("/login");
      return null;
    }
    return token;
  };

  const handleAuthError = (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isLoginned");
      navigate("/login");
    }
  };

  const fetchCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.get("https://shivyantra.onrender.com/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = response.data.cartItems || [];
      setCartItems(items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      handleAuthError(error);
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const token = getToken();
    if (!token || newQuantity < 1) return;

    try {
      await axios.put(
        `https://shivyantra.onrender.com/api/cart/${productId}/${newQuantity}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      handleAuthError(error);
    }
  };

  const deleteItem = async (productId) => {
    const token = getToken();
    if (!token) return;

    try {
      await axios.delete("https://shivyantra.onrender.com/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      });
      fetchCart();
    } catch (error) {
      console.error("Error deleting item:", error);
      handleAuthError(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.Price) || 0) * (item.Quantity || 1),
    0
  );

  if (loading) {
    return <p className="text-center py-20 text-gray-600">Loading your cart... 🚀</p>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">Your cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">🛍️ Your Shopping Cart</h2>

      {/* Cart Items */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 p-5 last:border-none"
          >
            {/* Left - Image & Details */}
            <div className="flex items-center gap-4 w-full sm:w-2/3">
              <img
                src={item.ProductImage || "https://via.placeholder.com/100"}
                alt={item.ProductName}
                className="w-24 h-24 object-cover rounded-lg border"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.ProductName}</h3>
                <p className="text-gray-500">₹{item.Price}</p>
              </div>
            </div>

            {/* Right - Controls */}
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              {/* Quantity */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => updateQuantity(item.id, item.Quantity - 1)}
                  disabled={item.Quantity <= 1}
                  className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <span className="px-4 py-1 text-gray-800 font-semibold">{item.Quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.Quantity + 1)}
                  className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-gray-900 font-semibold text-lg">
                ₹{(item.Price || 0) * (item.Quantity || 1)}
              </p>

              {/* Delete */}
              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
                title="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          Total: <span className="text-green-600">₹{totalPrice}</span>
        </h3>
        <button
          onClick={handleCheckout}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl shadow-md transition transform hover:scale-105"
        >
          Proceed to Checkout →
        </button>
=======
import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Dummy products for UI display
  const cartItems = [
    {
      id: 1,
      name: "Premium Rudraksha Mala",
      price: 1299,
      image: "/assets/r1.webp",
      qty: 1,
    },
    {
      id: 2,
      name: "Spiritual Copper Bracelet",
      price: 799,
      image: "/assets/r2.jpg",
      qty: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdf8f2] text-[#3b1d0f] py-10 px-5 md:px-10">
      {/* Page Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#420303] mb-8">
        Your Cart
      </h1>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-[#fff5eb] border border-[#d4af37]/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl border border-[#d4af37]/40"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-[#3b1d0f]">
                  {item.name}
                </h2>
                <p className="text-[#5b2a0c] mt-1 font-medium">
                  ₹{item.price.toLocaleString()}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <button className="bg-[#420303] text-[#f7f7f7] p-1.5 rounded-full hover:bg-[#5c1a0c]">
                    <Minus size={16} />
                  </button>
                  <span className="text-[#3b1d0f] font-semibold">{item.qty}</span>
                  <button className="bg-[#420303] text-[#f7f7f7] p-1.5 rounded-full hover:bg-[#5c1a0c]">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button className="ml-4 text-[#b91c1c] hover:text-[#7f1d1d] transition">
                <Trash2 size={22} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-[#fff5eb] border border-[#d4af37]/40 rounded-2xl p-6 shadow-md h-fit">
          <h2 className="text-xl font-semibold text-[#420303] mb-5">
            Order Summary
          </h2>

          <div className="space-y-3 text-[#3b1d0f]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{(1299 + 799 * 2).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-[#5b2a0c]">₹100</span>
            </div>
            <hr className="border-[#d4af37]/40 my-3" />
            <div className="flex justify-between font-semibold text-[#420303]">
              <span>Total</span>
              <span>₹{(1299 + 799 * 2 + 100).toLocaleString()}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block w-full mt-6 bg-[#420303] text-[#f7f7f7] text-center py-3 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#5c1a0c] transition"
          >
            Proceed to Checkout
          </Link>
        </div>
>>>>>>> eae1dac0198b1ef088ee2b7043bfd9d3a39d88f0
      </div>
    </div>
  );
};

export default Cart;
