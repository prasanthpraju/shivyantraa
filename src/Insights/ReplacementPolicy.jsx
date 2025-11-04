 import React from "react";

const ReplacementPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3d0101] via-[#420303] to-[#310502] text-[#f7f7f7] py-16 px-6 md:px-10">
      {/* 🌟 Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-[#d4af37] tracking-wide drop-shadow-lg">
          Replacement Policy
        </h1>
        <p className="mt-4 text-[#f5e6c5] text-lg max-w-3xl mx-auto leading-relaxed">
          At <span className="font-semibold text-[#d4af37]">Shriworks</span>, we value the trust you place in our craftsmanship.
          Our replacement policy ensures fairness, transparency, and care for every customer.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* 🪔 Section 1 */}
        <section className="bg-[#fef9e7]/10 border border-[#d4af37]/30 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm hover:shadow-[#d4af37]/30 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">Eligibility for Replacement</h2>
          <ul className="list-disc list-inside text-[#f7f7f7] leading-relaxed space-y-3 marker:text-[#d4af37]">
            <li>Replacements are available for items that are defective or differ significantly from the description.</li>
            <li>Custom-made items are not eligible for replacement unless there’s a genuine manufacturing defect.</li>
            <li>Products damaged during transport are not covered under our replacement policy.</li>
          </ul>
        </section>

        {/* 🌺 Section 2 */}
        <section className="bg-[#fef9e7]/10 border border-[#d4af37]/30 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm hover:shadow-[#d4af37]/30 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">Replacement Process</h2>
          <ol className="list-decimal list-inside text-[#f7f7f7] leading-relaxed space-y-3 marker:text-[#d4af37]">
            <li>
              <span className="text-[#d4af37] font-semibold">Contact Us:</span> Email{" "}
              <a href="mailto:info@shriworks.com" className="underline text-[#f5e6c5]">
                info@shriworks.com
              </a>{" "}
              within <strong>7 days</strong> of receiving your order with your order number and photos of the issue.
            </li>
            <li>
              <span className="text-[#d4af37] font-semibold">Approval:</span> Once reviewed, our team will confirm eligibility and next steps.
            </li>
            <li>
              <span className="text-[#d4af37] font-semibold">Return:</span> If approved, return the defective item in its original packaging. Return shipping is the customer's responsibility unless stated otherwise.
            </li>
            <li>
              <span className="text-[#d4af37] font-semibold">Replacement:</span> A new product will be shipped after inspection and confirmation.
            </li>
          </ol>
        </section>

        {/* 🔱 Section 3 */}
        <section className="bg-[#fef9e7]/10 border border-[#d4af37]/30 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm hover:shadow-[#d4af37]/30 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">Exclusions</h2>
          <ul className="list-disc list-inside text-[#f7f7f7] leading-relaxed space-y-3 marker:text-[#d4af37]">
            <li>Shriworks is not responsible for damages caused by courier mishandling after dispatch.</li>
            <li>We do not offer replacements for custom-made or personalized products unless defective.</li>
          </ul>
        </section>

        {/* ✨ Section 4 */}
        <section className="bg-[#fef9e7]/10 border border-[#d4af37]/30 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm hover:shadow-[#d4af37]/30 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">Important Note</h2>
          <ul className="list-disc list-inside text-[#f7f7f7] leading-relaxed space-y-3 marker:text-[#d4af37]">
            <li>All replacement requests must be made within <strong>1 day</strong> of receiving the item.</li>
            <li>Replacements depend on availability; if unavailable, we may offer an alternative or a refund.</li>
          </ul>
        </section>

        {/* 🕉️ Contact */}
        <section className="text-center border-t border-[#d4af37]/40 pt-6">
          <p className="text-[#f5e6c5] text-lg">
            Need help? Reach us at{" "}
            <a
              href="mailto:info@shriworks.com"
              className="text-[#d4af37] font-semibold hover:underline"
            >
              info@shriworks.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+919176554626"
              className="text-[#d4af37] font-semibold hover:underline"
            >
              (+91) 91765 54626
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReplacementPolicy;
