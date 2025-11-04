 import React from "react";
import rudraksha from "../assets/why.jpg"; // adjust path if needed

const WhyChooseUs = () => {
  return (
    <section className="px-5 md:px-10 py-14 bg-[#fffaf6] text-[#3b1d0f]">
      {/* 🔹 Section Title */}
      <h2 className="text-3xl font-bold text-center mb-10 uppercase tracking-wide text-[#4e1f07]">
        Why Choose Us
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* 🔸 Left Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={rudraksha}
            alt="Why Choose Us"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* 🔸 Right Content */}
        <div className="md:w-1/2 w-full space-y-6">
          <h3 className="text-2xl font-semibold text-[#4a2b15]">
            Trusted Quality & Expertise
          </h3>
          <p className="text-base leading-7 text-[#5b2a0c]">
            For over 18 years, we’ve built a reputation of trust and authenticity
            in providing genuine Rudraksha and spiritual guidance. Every product
            is carefully examined to meet the highest standards of purity and
            tradition.
          </p>

          {/* 🔹 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {/* Card 1 */}
            <div className="flex items-start gap-3 bg-[#fef9f5] p-4 rounded-xl shadow-sm hover:shadow-md hover:bg-[#fff3e6] transition">
              <span className="text-[#b8860b] text-2xl">⚙️</span>
              <div>
                <h4 className="font-semibold text-lg text-[#4e1f07]">
                  Genuine Quality
                </h4>
                <p className="text-sm text-[#5b2a0c]">
                  ISO 9001:2015 certified, with zero-defect assurance.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-start gap-3 bg-[#fef9f5] p-4 rounded-xl shadow-sm hover:shadow-md hover:bg-[#fff3e6] transition">
              <span className="text-[#b8860b] text-2xl">⚡</span>
              <div>
                <h4 className="font-semibold text-lg text-[#4e1f07]">
                  Fast Delivery
                </h4>
                <p className="text-sm text-[#5b2a0c]">
                  Quick dispatch and safe packaging worldwide.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex items-start gap-3 bg-[#fef9f5] p-4 rounded-xl shadow-sm hover:shadow-md hover:bg-[#fff3e6] transition">
              <span className="text-[#b8860b] text-2xl">🧘</span>
              <div>
                <h4 className="font-semibold text-lg text-[#4e1f07]">
                  Expert Guidance
                </h4>
                <p className="text-sm text-[#5b2a0c]">
                  Personalized Rudraksha recommendations by specialists.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex items-start gap-3 bg-[#fef9f5] p-4 rounded-xl shadow-sm hover:shadow-md hover:bg-[#fff3e6] transition">
              <span className="text-[#b8860b] text-2xl">💬</span>
              <div>
                <h4 className="font-semibold text-lg text-[#4e1f07]">
                  24/7 Support
                </h4>
                <p className="text-sm text-[#5b2a0c]">
                  Dedicated customer service for all your queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
