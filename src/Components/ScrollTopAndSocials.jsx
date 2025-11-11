 import React, { useEffect, useState } from "react";
import { ArrowUp, Instagram, Facebook, Twitter, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const ScrollTopAndSocials = () => {
  const [visible, setVisible] = useState(false);

  // Show arrow when scrolled
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 250);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* 🌟 Elegant Transparent Social Bar — Hidden on Mobile */}
      <div className="hidden md:flex fixed top-1/3 right-4 z-40 flex-col items-center gap-4 p-3 rounded-3xl backdrop-blur-2xl 
      bg-gradient-to-b from-[#3e2723]/80 via-[#4e342e]/70 to-[#3e2723]/80 border border-[#d4af37]/20 shadow-lg 
      transition-all duration-300 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]">

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-full bg-white/10 hover:bg-[#d4af37]/30 transition duration-300"
        >
          <Instagram className="text-[#f7f7f7] h-5 w-5" />
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-full bg-white/10 hover:bg-[#d4af37]/30 transition duration-300"
        >
          <Facebook className="text-[#f7f7f7] h-5 w-5" />
        </a>

        {/* Twitter */}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-full bg-white/10 hover:bg-[#d4af37]/30 transition duration-300"
        >
          <Twitter className="text-[#f7f7f7] h-5 w-5" />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/919176554626"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-full bg-white/10 hover:bg-[#25D366]/40 transition duration-300"
        >
          <FaWhatsapp className="text-[#f7f7f7] h-5 w-5" />
        </a>

        {/* Phone */}
        <a
          href="tel:+919176554626"
          className="p-2 rounded-full bg-white/10 hover:bg-[#d4af37]/30 transition duration-300"
        >
          <Phone className="text-[#f7f7f7] h-5 w-5" />
        </a>
      </div>

      {/* 🔼 Scroll-to-Top Arrow — Always visible when scrolled */}
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-b from-[#4e342e]/80 to-[#3e2723]/80 
          backdrop-blur-2xl border border-[#d4af37]/30 text-[#f7f7f7] shadow-lg 
          hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:scale-110 transition-all duration-300"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default ScrollTopAndSocials;
