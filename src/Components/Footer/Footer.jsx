 import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-red-900 text-yellow-100">
      {/* Main Footer Section */}
      <div className="mx-6 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Shivyantra Info */}
          <div>
            <h6 className="mb-4 font-semibold uppercase text-yellow-300">
              Shivyantra
            </h6>
            <p className="text-justify text-sm leading-6">
              At Shriworks, we specialize in creating exquisite handcrafted
              temple jewelry and artifacts that embody the essence of South
              Indian temple traditions. Our skilled artisans use time-honored
              techniques to craft each piece with authenticity and excellence.
            </p>
          </div>

          {/* Insights */}
          <div>
            <h6 className="mb-4 font-semibold uppercase text-yellow-300">
              Insights
            </h6>
            {[
              ["Replacement Policy", "/ReplacementPolicy"],
              ["Shipping Policy", "/ShippingPolicy"],
              ["Cancellation Policy", "/CancellationPolicy"],
              ["Strategic Vision", "/StrategicVision"],
            ].map(([text, link]) => (
              <p key={text} className="mb-2 hover:underline">
                <a href={link}>{text}</a>
              </p>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="mb-4 font-semibold uppercase text-yellow-300">
              Quick Links
            </h6>
            {[
              ["Home", "/"],
              ["Shop", "/shop"],
              ["Blog", "/blog"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([text, link]) => (
              <p key={text} className="mb-2 hover:underline">
                <a href={link}>{text}</a>
              </p>
            ))}
          </div>

          {/* Address & Contact */}
          <div>
            <h6 className="mb-4 font-semibold uppercase text-yellow-300">
              Address
            </h6>

            <p className="mb-3 text-sm flex items-start">
              <FaMapMarkerAlt className="text-yellow-400 mr-2 mt-1" />
              242A, Arcot Rd, Vadapalani, Chennai - 600026
            </p>

            <p className="mb-3 text-sm flex items-center">
              <HiMail className="text-yellow-400 mr-2" />
              <a href="mailto:info@shriworks.com" className="hover:underline">
                info@shriworks.com
              </a>
            </p>

            <p className="mb-3 text-sm flex items-center">
              <FaPhone className="text-yellow-400 mr-2" />
              <a href="tel:+919176554626" className="hover:underline">
                (+91) 91765 54626
              </a>
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/shriworks"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-blue-700 p-2 rounded-full hover:scale-110 transition"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/shriworks/"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-pink-600 p-2 rounded-full hover:scale-110 transition"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919176554626"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-green-600 p-2 rounded-full hover:scale-110 transition"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>

              <a
                href="https://www.youtube.com/@shriworks"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-red-600 p-2 rounded-full hover:scale-110 transition"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-yellow-300 opacity-25 mx-[5%]" />

      {/* Bottom Bar */}
      <div className="text-yellow-200 p-6 mx-[5%] text-center flex flex-col md:flex-row justify-between text-sm">
        <div>
          <span className="opacity-50">© 2024 Copyright: </span>
          <a
            className="font-semibold uppercase hover:underline"
            href="https://shivyantra.com/"
            target="_blank"
            rel="noreferrer"
          >
            Shivyantra
          </a>
        </div>
        <div>
          <span className="opacity-50">Developed by: </span>
          <a
            className="font-semibold uppercase hover:underline"
            href="https://www.jgntechnologies.com/"
            target="_blank"
            rel="noreferrer"
          >
            JGN TECHNOLOGIES
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
