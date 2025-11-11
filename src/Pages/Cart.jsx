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
      </div>
    </div>
  );
};

export default Cart;
