 import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toast setup
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          "https://shivyantra.onrender.com/api/products?populate=*"
        );
        const products = res.data?.data || [];
        const found = products.find((item) => String(item.id) === String(id));
        setProduct(found || null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
        documentId: product.id,
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
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Gallery */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
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
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>

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
                <div className="text-2xl font-bold text-amber-800">₹{Price}</div>
                <div className="text-sm text-gray-500">Inclusive of GST</div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleAddToCart(product)}
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
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
