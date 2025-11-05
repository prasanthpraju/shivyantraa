 import React from "react";

const StrategicVision = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-12 border border-red-100">
        <h1 className="text-4xl font-bold text-center text-red-900 mb-8 uppercase">
          Our Strategic Vision
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed text-lg text-center">
          At <span className="font-semibold text-red-900">Rudrakha</span>, our
          vision goes beyond products — it is about awakening consciousness,
          restoring balance, and empowering every individual to connect with
          divine energy through the sacred science of Rudraksha and spiritual
          wellness.
        </p>

        <hr className="my-8 border-t border-red-200 w-2/3 mx-auto" />

        {/* Vision Section */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          1. The Heart of Our Vision
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Our strategic vision is rooted in spreading authentic spiritual
          knowledge and making the power of Rudraksha accessible to all.  
          We aim to create a global platform that unites tradition and
          technology — where faith meets innovation, and devotion meets digital
          experience.
        </p>

        {/* Mission Section */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          2. Mission for a Conscious World
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed">
          <li>
            To promote <span className="font-semibold">authentic Rudraksha</span> and
            spiritual tools sourced ethically and energized traditionally.
          </li>
          <li>
            To guide individuals toward physical, emotional, and spiritual
            harmony through knowledge, rituals, and meditation.
          </li>
          <li>
            To combine <span className="font-semibold">ancient Vedic wisdom</span> with
            modern technology for a seamless global spiritual experience.
          </li>
          <li>
            To inspire self-awareness and spiritual growth for future
            generations.
          </li>
        </ul>

        {/* Values Section */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          3. Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 border border-red-100 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              🔸 Authenticity
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We honor the sacred origin of Rudraksha and ensure every bead
              carries purity, sanctity, and verified authenticity.
            </p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              🔸 Compassion
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our work is guided by compassion, aiming to bring peace and
              healing to every heart we serve.
            </p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              🔸 Integrity
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We stay true to our spiritual roots and transparent in every
              aspect — from sourcing to service.
            </p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              🔸 Innovation
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We embrace digital transformation to expand access to spiritual
              knowledge and sacred products worldwide.
            </p>
          </div>
        </div>

        {/* Global Vision */}
        <h2 className="text-2xl font-semibold text-red-900 mt-8 mb-3">
          4. A Global Spiritual Ecosystem
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Rudrakha envisions becoming a global hub for spirituality — where
          seekers, healers, and believers connect across borders.  
          Our digital platform aspires to integrate authentic Rudraksha beads,
          guided practices, astrology consultations, and spiritual education
          under one sacred roof.
        </p>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Guided by devotion and strengthened by purpose, Rudrakha continues
            to walk the path of service, knowledge, and light.
          </p>
          <p className="text-red-900 font-semibold text-xl">
            🌺 “Our vision is not just to sell — but to serve the soul.” 🌺
          </p>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Last Updated: {new Date().toLocaleDateString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default StrategicVision;
