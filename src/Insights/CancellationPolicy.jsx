 import React from "react";
import cancelHero from "../assets/rud5.jpg";  
 

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ===== Hero Section ===== */}
      <section
        className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center bg-red-900"
        style={{
          backgroundImage: `url(${cancelHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center">
          <h1 className="text-yellow-300 text-4xl md:text-5xl font-bold uppercase drop-shadow-lg">
            Cancellation Policy
          </h1>
          <p className="text-yellow-100 mt-3 text-lg">
            Transparent, fair, and customer-friendly — because we value your
            trust.
          </p>
        </div>
      </section>

      {/* ===== Main Content ===== */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 space-y-12">
        {/* Intro */}
        <section className="text-center">
         
          <p className="text-lg leading-relaxed text-gray-800">
            At <span className="font-bold text-red-900">Shriworks</span>, we
            understand that plans can change. You can cancel your order within{" "}
            <span className="font-semibold">24 hours</span> of placing it. Please
            find the detailed policy below.
          </p>
        </section>

        {/* Order Cancellation */}
        <section>
          <h2 className="text-2xl font-bold text-red-900 mb-4 border-b-2 border-red-900 inline-block">
            Order Cancellation (Within 24 Hours)
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 leading-relaxed marker:text-red-900 marker:text-xl">
            <li>
              Orders can be canceled within 24 hours if they haven’t been
              processed or shipped.
            </li>
            <li>
              After 24 hours or once processed/shipped, cancellations cannot be
              accepted.
            </li>
          </ul>
        </section>

        {/* Custom Orders */}
        <section>
          <h2 className="text-2xl font-bold text-red-900 mb-4 border-b-2 border-red-900 inline-block">
            Custom and Bespoke Orders
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 leading-relaxed marker:text-red-900 marker:text-xl">
            <li>
              Custom-made or personalized orders must be canceled within 24
              hours.
            </li>
            <li>Once production begins, cancellation will no longer be possible.</li>
          </ul>
        </section>

        {/* How to Cancel */}
        <section className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
          <h2 className="text-2xl font-bold text-red-900 mb-4">How to Cancel</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 leading-relaxed marker:text-red-900 marker:text-xl">
            <li>
              Contact our team at{" "}
              <a
                href="mailto:info@shriworks.com"
                className="text-red-900 font-semibold hover:underline"
              >
                info@shriworks.com
              </a>{" "}
              within 24 hours of placing your order.
            </li>
            <li>
              Include your order number and details — we’ll confirm if your order
              is eligible for cancellation.
            </li>
          </ul>
        </section>

        {/* Refunds */}
        <section>
          <h2 className="text-2xl font-bold text-red-900 mb-4 border-b-2 border-red-900 inline-block">
            Refunds for Canceled Orders
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 leading-relaxed marker:text-red-900 marker:text-xl">
            <li>
              Eligible cancellations receive a full refund to the original
              payment method.
            </li>
            <li>
              Refunds typically take{" "}
              <strong>7–10 business days</strong> after confirmation.
            </li>
          </ul>
        </section>

        {/* Non-Cancellable */}
        <section>
          <h2 className="text-2xl font-bold text-red-900 mb-4 border-b-2 border-red-900 inline-block">
            Non-Cancellable Orders
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 leading-relaxed marker:text-red-900 marker:text-xl">
            <li>
              Orders that are shipped or custom-made in production cannot be
              canceled.
            </li>
            <li>
              For issues with received products, refer to our Return & Replacement
              Policy.
            </li>
          </ul>
        </section>

        {/* Shriworks-Initiated */}
        <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-red-900 mb-4">
            Shriworks-Initiated Cancellations
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 leading-relaxed marker:text-red-900 marker:text-xl">
            <li>
              We may cancel orders due to product unavailability or pricing
              errors.
            </li>
            <li>
              In such cases, you’ll receive a full refund and prompt notification.
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="text-center border-t border-gray-300 pt-6">
          <p className="text-lg text-gray-800">
            Have questions? Reach us at{" "}
            <a
              href="mailto:info@shriworks.com"
              className="font-semibold text-red-900 hover:underline"
            >
              info@shriworks.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+919176554626"
              className="font-semibold text-red-900 hover:underline"
            >
              (+91) 91765 54626
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CancellationPolicy;
