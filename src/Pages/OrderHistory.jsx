import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("refresh_token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://yourapi.com/api/orders", // replace with your API
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-xl transition"
          >
            <h2 className="font-semibold text-lg mb-2">
              Order #{order.orderNumber}
            </h2>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Total:</span> ₹{order.total}
            </p>
            <p>
              <span className="font-medium">Status:</span> {order.status}
            </p>
            <button
              onClick={() => navigate(`/order/${order.id}`)}
              className="mt-3 bg-[#d4af37] text-[#310502] px-3 py-1 rounded hover:bg-[#f0cf77] transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
