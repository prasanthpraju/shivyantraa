import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
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

  // ✅ Fetch Cart Items (or fallback mock)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please login to continue checkout.");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get("https://shivyantra.onrender.com/api/cart?populate=*", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data?.data || [];
        setCartItems(data);

        // calculate total
        const totalAmount = data.reduce((sum, item) => {
          const price = item.product?.Price || item?.attributes?.product?.data?.attributes?.Price || 0;
          return sum + price * (item.quantity || 1);
        }, 0);

        setTotal(totalAmount);
      } catch (err) {
        console.error("Error fetching cart:", err);
        // fallback for demo
        setCartItems([
          { id: 1, product: { ProductName: "Classic Blend", Price: 499 }, quantity: 1 },
          { id: 2, product: { ProductName: "Premium Chai", Price: 299 }, quantity: 2 },
        ]);
        setTotal(499 + 299 * 2);
      }
    };

    fetchCart();
  }, [navigate]);

  // ✅ Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Order Submit
  const handleOrder = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert("Please fill all required fields.");
      return;
    }

    alert("🎉 Order placed successfully!");
    navigate("/thankyou");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/70 to-amber-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section - Shipping Info */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-lg p-8">
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

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Payment Method
              </h3>
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

            <button
              type="submit"
              className="mt-8 bg-red-900 text-white px-8 py-3 rounded-lg font-semibold hover:brightness-95 transition w-full"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right Section - Order Summary */}
        <aside className="lg:col-span-5 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-red-900 mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => {
              const name =
                item.product?.ProductName ||
                item?.attributes?.product?.data?.attributes?.ProductName ||
                "Unnamed Product";
              const price =
                item.product?.Price ||
                item?.attributes?.product?.data?.attributes?.Price ||
                0;

              return (
                <div key={item.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 className="font-medium text-gray-800">{name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <div className="font-semibold text-amber-800">₹{price}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t pt-4 text-lg font-semibold flex justify-between text-amber-900">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <p className="text-sm text-gray-500 mt-2">Inclusive of all taxes</p>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/cart")}
              className="text-sm text-amber-900 hover:underline"
            >
              ← Back to Cart
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
