 import React, { useState } from "react";
import { toast } from "react-toastify";
import { MapPin, Phone, Clock } from "lucide-react";
 

const Contact = () => {
  const [name, setName] = useState("");
  const [emailId, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && emailId && message) {
      try {
        await api.post("/api/contacts", {
          data: { Name: name, Email: emailId, Message: message },
        });
        toast.success("Your message has been sent successfully!");
        setTimeout(() => (window.location.href = "/"), 3000);
      } catch {
        toast.error("Something went wrong, please try again later!");
      }
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  return (
    // ✅ Entire page now has yellow background
    <section id="contact" className="min-h-screen bg-yellow-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 text-center">
          <h1 className="text-base font-semibold uppercase tracking-wider text-black">
            Contact
          </h1>
          <h2 className="font-bold text-red-900 text-3xl sm:text-5xl mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-black">
            Get in touch with us to buy your products today
          </p>
        </div>

        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            {/* ===== LEFT SIDE ===== */}
            <div className="p-5 md:p-12">
              <p className="mb-12 text-lg text-justify text-black opacity-80">
                At shivyantra, our support team is here to assist you with any
                queries. Reach out for prompt, personalized service.
              </p>

              <ul>
                {/* Address */}
                <li className="flex mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-red-900">
                    <MapPin className="h-6 w-6 text-yellow-100" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-red-900 mb-2">Our Address</h3>
                    <p className="text-black opacity-90">
                      242A, Arcot Rd, Vadapalani, Chennai, Tamil Nadu 600026.
                    </p>
                  </div>
                </li>

                {/* Contact */}
                <li className="flex mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-red-900">
                    <Phone className="h-6 w-6 text-yellow-100" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-red-900 mb-2">Contact</h3>
                    <p className="text-black opacity-90">
                      Mobile: (+91) 91765 54626
                    </p>
                    <p className="text-black opacity-90">
                      Mail: Info@shriworks.com
                    </p>
                  </div>
                </li>

                {/* Working Hours */}
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-red-900">
                    <Clock className="h-6 w-6 text-yellow-100" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-red-900 mb-2">
                      Working Hours
                    </h3>
                    <p className="text-black opacity-90">
                      Mon - Sat: 10:00 AM - 8:30 PM
                    </p>
                    <p className="text-black opacity-90">
                      Sunday: 10:00 AM - 2:30 PM
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* ===== RIGHT SIDE (FORM) ===== */}
            <div className="h-fit max-w-6xl p-5 md:p-12">
              <h2 className="mb-4 text-2xl font-bold text-black">
                Ready to Get Started?
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mb-3 w-full rounded-md border border-gray-400 bg-white py-2 px-3 text-black shadow-md focus:ring-2 focus:ring-red-900 outline-none"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="mb-3 w-full rounded-md border border-gray-400 bg-white py-2 px-3 text-black shadow-md focus:ring-2 focus:ring-red-900 outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="mb-3 w-full rounded-md border border-gray-400 bg-white py-2 px-3 text-black shadow-md focus:ring-2 focus:ring-red-900 outline-none"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full bg-red-900 text-yellow-100 font-semibold uppercase px-4 py-2 rounded cursor-pointer border border-transparent hover:scale-[1.03] hover:bg-red-800 transition-all duration-300"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7610711104744!2d80.21254447575778!3d13.050874787271859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267f622160271%3A0x3149fc03560d447!2sJGN%20Technologies!5e0!3m2!1sen!2sin!4v1743079683877!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: "0" }}
            loading="lazy"
            title="Google Map"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
