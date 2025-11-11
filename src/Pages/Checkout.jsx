 // Checkout.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "COD",
  });
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Fetch cart items
  useEffect(() => {
    const token = localStorage.getItem("refresh_token");
    if (!token) {
      alert("Please login to continue checkout.");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get("https://shivyantra.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = res.data.cartItems || [];
        setCartItems(items);
        const totalAmount = items.reduce(
          (sum, item) => sum + parseFloat(item.Price || 0) * (item.Quantity || 1),
          0
        );
        setTotal(totalAmount);
      } catch (err) {
        console.error("Error fetching cart:", err);
        alert("Failed to load cart. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();

    // Generate random coupon on page load
    const randomCoupon = `SAVE${Math.floor(1000 + Math.random() * 9000)}`; // e.g., SAVE1234
    setCoupon(randomCoupon);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    // Random discount between 5% to 20%
    if (coupon.startsWith("SAVE")) {
      const randomDiscount = Math.floor(5 + Math.random() * 16); // 5-20%
      setDiscountPercent(randomDiscount);
      setTotal((prev) => prev * (1 - randomDiscount / 100));
      alert(`Coupon ${coupon} applied! ${randomDiscount}% discount.`);
    } else {
      alert("Invalid coupon.");
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert("Please fill all required fields.");
      return;
    }

    const token = localStorage.getItem("refresh_token");
    if (!token) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    try {
      const orderData = {
        customer: form,
        items: cartItems.map((item) => ({
          productId: item.documentId,
          ProductName: item.ProductName,
          Price: parseFloat(item.Price),
          Quantity: item.Quantity,
        })),
        totalAmount: total,
        couponApplied: coupon,
        discountPercent,
      };

      await axios.post("https://shivyantra.onrender.com/api/order", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("🎉 Order placed successfully!");
      navigate("/thankyou");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading)
    return <p className="text-center py-20 text-gray-600">Loading checkout... 🚀</p>;
  if (cartItems.length === 0)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/70 to-amber-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Top Navigation Buttons */}
        <div className="flex justify-between items-center mb-6 sticky top-4 bg-amber-50 z-10 p-2 rounded-lg shadow-sm">
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/shop")}
              className="bg-red-900 text-white px-4 py-2 rounded-lg hover:brightness-95 transition"
            >
              Back to Shop
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="bg-red-700 text-white px-4 py-2 rounded-lg hover:brightness-95 transition"
            >
              Back to Cart
            </button>
          </div>
          <button
            onClick={() => navigate("/orderhistory")}
            className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:brightness-95 transition"
          >
            Order History
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Section - Shipping Info */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-red-900 mb-6">Shipping Details</h2>
              <form className="space-y-4" onSubmit={handleOrder}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className="border border-amber-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-amber-300 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border border-amber-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-amber-300 outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    className="border border-amber-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-amber-300 outline-none"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode *"
                    className="border border-amber-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-amber-300 outline-none"
                  />
                </div>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Full Address *"
                  rows="3"
                  className="border border-amber-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-amber-300 outline-none"
                ></textarea>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="border border-amber-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-amber-300 outline-none"
                  />
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="border border-amber-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-amber-300 outline-none"
                  />
                </div>

                {/* Payment */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Payment Method</h3>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={form.payment === "COD"}
                        onChange={handleChange}
                      />
                      <span>Cash on Delivery</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="Online"
                        checked={form.payment === "Online"}
                        onChange={handleChange}
                      />
                      <span>Online Payment</span>
                    </label>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-amber-300 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-red-900 text-white px-4 py-2 rounded-lg hover:brightness-95 transition"
                  >
                    Apply
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-8 bg-red-900 text-white px-8 py-3 rounded-lg font-semibold hover:brightness-95 transition w-full"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <aside className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-red-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.documentId}
                    className="flex justify-between items-center border-b pb-3 hover:bg-amber-50 rounded-lg transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.ProductImage}
                        alt={item.ProductName}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{item.ProductName}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.Quantity}</p>
                      </div>
                    </div>
                    <div className="font-semibold text-amber-800">
                      ₹{item.Price * item.Quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4 text-lg font-semibold flex justify-between text-amber-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <p className="text-sm text-gray-500 mt-2">Inclusive of all taxes</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
  