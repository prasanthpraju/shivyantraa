 import React from "react";

const ReplacementPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-12 border border-red-100">
        <h1 className="text-4xl font-bold text-center text-red-900 mb-8 uppercase">
          Replacement Policy
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          At <span className="font-semibold text-red-900">Rudrakha</span>, our
          goal is to provide you with sacred, authentic, and spiritually pure
          products. Each Rudraksha bead, Yantra, or Puja item undergoes careful
          inspection and energization before dispatch.  
          However, in rare cases of damage or manufacturing defects, we offer a
          replacement policy to ensure your satisfaction and trust.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          1. Eligibility for Replacement
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Replacement requests are accepted only under the following
          circumstances:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed">
          <li>
            You received a **damaged**, **defective**, or **incorrect** item.
          </li>
          <li>
            The product delivered does not match the item described on our
            website.
          </li>
          <li>
            The issue is reported within{" "}
            <span className="font-semibold">48 hours of delivery</span>.
          </li>
        </ul>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          2. Non-Replaceable Items
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Certain sacred and personalized products cannot be replaced once
          shipped. These include:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed">
          <li>Personalized or customized Rudraksha Malas and Yantras.</li>
          <li>
            Energized or blessed items that have undergone spiritual rituals.
          </li>
          <li>Digital consultations, astrology reports, or e-services.</li>
          <li>Items damaged due to misuse, improper handling, or wear and tear.</li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          3. Replacement Process
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          To initiate a replacement, please follow these steps:
        </p>
        <ol className="list-decimal list-inside text-gray-700 mb-6 leading-relaxed">
          <li>
            Send an email to{" "}
            <a
              href="mailto:support@rudrakha.com"
              className="text-red-900 font-semibold underline"
            >
              support@rudrakha.com
            </a>{" "}
            within 48 hours of receiving your order.
          </li>
          <li>
            Include your **order ID**, clear **photos/videos** of the item, and
            a brief explanation of the issue.
          </li>
          <li>
            Our quality team will review your request and confirm eligibility
            within <span className="font-semibold">2–3 business days</span>.
          </li>
          <li>
            Once approved, we’ll arrange a pickup or request you to ship the
            item back to our return address.
          </li>
          <li>
            A **replacement product** will be sent within{" "}
            <span className="font-semibold">7–10 business days</span> after
            receiving the returned item.
          </li>
        </ol>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          4. Conditions for Replacement Approval
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed">
          <li>Item must be unused, unwashed, and in its original packaging.</li>
          <li>
            The product must include all original accessories, certificates, or
            documents.
          </li>
          <li>
            Our inspection team must verify that the defect is genuine and not
            caused by external factors.
          </li>
        </ul>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          5. Shipping for Replacement
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          - If the replacement is due to a mistake on our part (wrong or damaged
          product), Rudrakha will cover all shipping costs.  
          - If the replacement is due to customer preference or error (wrong
          size, incorrect address, etc.), the customer will bear the return
          shipping charges.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          6. Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          For any replacement-related queries or assistance, please reach out to
          us:
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

export default ReplacementPolicy;
