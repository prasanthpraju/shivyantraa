 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion"; // for animations

const Cart = ({ setCartCount }) => {
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
      if (setCartCount) {
        const totalQty = items.reduce((sum, item) => sum + (item.Quantity || 1), 0);
        setCartCount(totalQty);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const showToast = (message, icon = "success") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      icon,
      title: message,
      background: "#fff",
      color: "#333",
      timerProgressBar: true,
    });
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    const token = getToken();
    if (!token) return;

    try {
      // Optimistic UI update with animation
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, Quantity: newQuantity, animate: true }
            : item
        )
      );

      if (setCartCount) {
        const totalQty = cartItems.reduce(
          (sum, item) =>
            sum + (item.id === id ? newQuantity : item.Quantity || 1),
          0
        );
        setCartCount(totalQty);
      }

      await axios.put(
        `https://shivyantra.onrender.com/api/cart/${id}/quantity`,
        { Quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast(`Quantity updated!`);
    } catch (error) {
      console.error("Error updating quantity:", error);
      handleAuthError(error);
      fetchCart(); // rollback
    }
  };

  const deleteItem = async (id) => {
    const token = getToken();
    if (!token) return;

    const item = cartItems.find((i) => i.id === id);

    // SweetAlert2 confirm
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete ${item?.ProductName} from cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`https://shivyantra.onrender.com/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prev) => prev.filter((item) => item.id !== id));

      if (setCartCount) {
        const totalQty = cartItems
          .filter((item) => item.id !== id)
          .reduce((sum, item) => sum + (item.Quantity || 1), 0);
        setCartCount(totalQty);
      }

      showToast(`${item?.ProductName} removed from cart!`, "success");
    } catch (error) {
      console.error("Error deleting item:", error);
      handleAuthError(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.Price || 0) * (item.Quantity || 1),
    0
  );

  if (loading)
    return <p className="text-center py-20 text-gray-600">Loading your cart... 🚀</p>;

  if (cartItems.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">Your cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/shop")}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 bg-gray-50 min-h-screen">
      {/* Header with Back to Shop */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">🛍️ Your Shopping Cart</h2>
        <button
          onClick={() => navigate("/shop")}
          className="bg-red-900 hover:bg-red-800 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-200"
        >
          ← Back to Shop
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.documentId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row justify-between items-center bg-white border-b border-gray-200 p-5 rounded-2xl shadow-md last:border-none"
            >
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

              <div className="flex items-center gap-6 mt-4 sm:mt-0">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.Quantity - 1)}
                    disabled={item.Quantity <= 1}
                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    -
                  </button>
                  <motion.span
                    key={item.Quantity}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-1 text-gray-800 font-semibold"
                  >
                    {item.Quantity}
                  </motion.span>
                  <button
                    onClick={() => updateQuantity(item.id, item.Quantity + 1)}
                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="text-gray-900 font-semibold text-lg">
                  ₹{(item.Price || 0) * (item.Quantity || 1)}
                </p>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
                  title="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Total & Checkout */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          Total: <span className="text-green-600">₹{totalPrice}</span>
        </h3>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl shadow-md transition transform hover:scale-105"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

export default Cart;
