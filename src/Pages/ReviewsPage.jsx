import React from "react";

const ReviewsPage = ({ reviews = [] }) => {
  // Sample fallback data
  const mockReviews = [
    {
      id: 1,
      name: "Arun",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely loved it! The aroma and balance are spot on.",
    },
    {
      id: 2,
      name: "Meena",
      rating: 4,
      date: "1 week ago",
      comment: "Good flavor, but the packaging could be better.",
    },
    {
      id: 3,
      name: "Vikram",
      rating: 5,
      date: "3 weeks ago",
      comment: "Authentic taste. Reminds me of Hyderabad biryani!",
    },
  ];

  const data = reviews.length ? reviews : mockReviews;

  return (
    <div className="min-h-screen bg-amber-50 py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-amber-900">Customer Reviews</h1>
          <p className="text-gray-600 mt-2">
            Read what our customers are saying about this product.
          </p>
        </div>

        {/* Average Rating */}
        <div className="bg-white shadow-sm rounded-2xl p-6 mb-8 text-center">
          <div className="text-5xl font-bold text-amber-800">4.7<span className="text-gray-400 text-2xl">★</span></div>
          <p className="text-sm text-gray-600 mt-1">Based on {data.length} reviews</p>
          <button className="mt-4 px-6 py-2 bg-amber-700 text-white rounded-full font-medium hover:brightness-95 transition">
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-5">
          {data.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-800">{r.name}</div>
                  <div className="text-sm text-gray-500">{r.date}</div>
                </div>
                <div className="text-amber-700 font-bold">{r.rating} ★</div>
              </div>

              <p className="mt-3 text-gray-700 leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <button
            onClick={() => window.history.back()}
            className="text-amber-900 font-medium hover:underline"
          >
            ← Back to Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
