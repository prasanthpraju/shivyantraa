 import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-12 border border-red-100">
        <h1 className="text-4xl font-bold text-center text-red-900 mb-8 uppercase">
          Shipping Policy
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          At <span className="font-semibold text-red-900">Rudrakha</span>, we
          take great care in delivering your sacred products safely and on time.
          Each Rudraksha, Yantra, and Puja item is handled with spiritual care
          and securely packaged to preserve its sanctity and quality.  
          This Shipping Policy explains how and when your order will be shipped.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          1. Processing Time
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          - All confirmed orders are processed within{" "}
          <span className="font-semibold">1–3 business days</span> (excluding
          Sundays and public holidays).  
          <br />
          - Custom or energized Rudraksha items may take{" "}
          <span className="font-semibold">3–7 business days</span> to prepare
          before dispatch, as they undergo sacred rituals and energization
          ceremonies.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          2. Shipping Methods & Delivery Time
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We partner with trusted national and international courier services to
          ensure safe delivery.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed">
          <li>
            <span className="font-semibold">Domestic Orders (India):</span>{" "}
            Estimated delivery within <strong>4–7 business days</strong> after
            dispatch.
          </li>
          <li>
            <span className="font-semibold">International Orders:</span>{" "}
            Estimated delivery within <strong>10–20 business days</strong>,
            depending on customs and local regulations.
          </li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          3. Shipping Charges
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          - **Free shipping** is available for domestic orders above{" "}
          <span className="font-semibold">₹999</span>.  
          - For international orders, shipping costs are calculated based on
          weight and destination and will be displayed during checkout.  
          - All applicable customs duties, import taxes, or handling charges
          (for international shipments) are the responsibility of the buyer.
        </p>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          4. Tracking Your Order
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Once your order is shipped, you will receive an email or SMS
          notification with a tracking ID and link to monitor your delivery
          status in real time.  
          You can also check your order status by logging into your{" "}
          <span className="font-semibold text-red-900">Rudrakha</span> account.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          5. Packaging & Handling
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Every Rudraksha bead, Yantra, or Puja item is cleansed, blessed, and
          securely packed using eco-friendly materials. We ensure that all
          sacred products are protected against moisture and damage during
          transit.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          6. Delays or Lost Packages
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          While we strive for timely delivery, unexpected delays due to courier
          issues, weather, or customs processes may occur.  
          If your package is delayed or lost in transit, please contact our
          support team within <span className="font-semibold">7 days</span> of
          the expected delivery date.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          7. Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          For any shipping-related queries or assistance, please reach out to:
          <br />
          📧{" "}
          <a
            href="mailto:support@rudrakha.com"
            className="text-red-900 font-semibold underline"
          >
            support@rudrakha.com
          </a>
          <br />
          📞 +91-9876543210
        </p>

        <p className="text-center text-gray-500 text-sm mt-10">
          Last Updated: {new Date().toLocaleDateString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
