import React from "react";

const FAQ = () => {
  return (
    <section className="bg-[#fdf8f2] text-[#3b1d0f] min-h-screen flex flex-col justify-center items-center py-10 px-5 md:px-10">
      {/* === Title === */}
      <div className="w-full flex justify-center mb-10">
        <h2 className="flex flex-row items-center w-full md:w-1/2">
          <span className="flex-grow block border-t border-[#d4af37]"></span>
          <span className="flex-none block mx-4 px-3 py-2 text-lg md:text-xl font-semibold uppercase text-[#b07b2a]">
            FAQ's
          </span>
          <span className="flex-grow block border-t border-[#d4af37]"></span>
        </h2>
      </div>

      {/* === FAQ Content === */}
      <div className="w-full max-w-4xl mx-auto bg-[#fff8f0] rounded-2xl shadow-md p-6 md:p-10 border border-[#e5d3b3]">
        <div className="flex flex-col divide-y divide-[#e5d3b3]">
          {[
            {
              q: "What makes your Rudraksha beads authentic?",
              a: "Every bead is lab-certified and goes through a strict quality check. We source directly from trusted regions and provide authenticity certificates.",
            },
            {
              q: "Do you provide guidance on choosing the right Rudraksha?",
              a: "Yes! Our experts analyze your needs and suggest the most suitable Rudraksha combination for your goals and energy balance.",
            },
            {
              q: "How can I be sure of the quality before ordering?",
              a: "We use ISO 9001:2015 accredited labs for testing and ensure each bead is genuine before dispatch.",
            },
            {
              q: "What is the delivery time for online orders?",
              a: "Usually within 3–5 business days across India. International deliveries depend on the destination but we ensure fast and safe shipping.",
            },
            {
              q: "Can Rudraksha be worn by anyone?",
              a: "Yes, anyone can wear Rudraksha irrespective of religion or gender. Our experts will guide you on the right way to wear it for maximum benefit.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group py-3 transition-all duration-300 cursor-pointer"
            >
              <summary className="text-lg font-medium flex justify-between items-center text-[#4b2c16] hover:text-[#b07b2a]">
                {item.q}
                <span className="text-[#b07b2a] group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>
              <div className="mt-2 pl-2 pr-4 text-sm text-[#5b3a1c] leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
