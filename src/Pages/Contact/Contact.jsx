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
    <section id="contact" className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-base font-semibold uppercase tracking-wider text-[#3E2723]">
            Contact
          </h1>
          <h2 className="font-bold text-[#3E2723] text-3xl sm:text-5xl mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-[#4E342E]">
            Get in touch with us to buy your products today
          </p>
        </div>

        {/* Contact Grid */}
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="p-5 md:p-12">
              <p className="mb-12 text-lg text-justify text-[#3E2723] opacity-90">
                At <span className="font-semibold">shivyantra</span>, our
                support team is here to assist you with any queries. Reach out
                for prompt, personalized service.
              </p>

              <ul>
                {/* Address */}
                <li className="flex mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#4E342E]">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#4E342E] mb-2">
                      Our Address
                    </h3>
                    <p className="text-[#3E2723] opacity-90">
                      242A, Arcot Rd, Vadapalani, Chennai, Tamil Nadu 600026.
                    </p>
                  </div>
                </li>

                {/* Contact */}
                <li className="flex mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#4E342E]">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#4E342E] mb-2">Contact</h3>
                    <p className="text-[#3E2723] opacity-90">
                      Mobile: (+91) 91765 54626
                    </p>
                    <p className="text-[#3E2723] opacity-90">
                      Mail: Info@shriworks.com
                    </p>
                  </div>
                </li>

                {/* Working Hours */}
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#4E342E]">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#4E342E] mb-2">
                      Working Hours
                    </h3>
                    <p className="text-[#3E2723] opacity-90">
                      Mon - Sat: 10:00 AM - 8:30 PM
                    </p>
                    <p className="text-[#3E2723] opacity-90">
                      Sunday: 10:00 AM - 2:30 PM
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* RIGHT SIDE (FORM) */}
            <div className="h-fit max-w-6xl p-5 md:p-12 bg-white rounded-xl shadow-lg border border-[#D7CCC8]">
              <h2 className="mb-4 text-2xl font-bold text-[#3E2723]">
                Ready to Get Started?
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mb-3 w-full rounded-md border border-[#A1887F] bg-white py-2 px-3 text-[#3E2723] shadow-sm focus:ring-2 focus:ring-[#4E342E] outline-none"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="mb-3 w-full rounded-md border border-[#A1887F] bg-white py-2 px-3 text-[#3E2723] shadow-sm focus:ring-2 focus:ring-[#4E342E] outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="mb-3 w-full rounded-md border border-[#A1887F] bg-white py-2 px-3 text-[#3E2723] shadow-sm focus:ring-2 focus:ring-[#4E342E] outline-none"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full bg-[#4E342E] text-white font-semibold uppercase px-4 py-2 rounded cursor-pointer hover:scale-[1.03] hover:bg-[#3E2723] transition-all duration-300"
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
