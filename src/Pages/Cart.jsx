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
      </div>
    </div>
  );
};

export default Cart;
