// src/pages/Contact.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";

import { saveContactMessage } from "../services/data";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setAlert({
        type: "error",
        message: "Please fill all fields.",
      });

      return;
    }

    try {
      setLoading(true);

      const result = await saveContactMessage(
        formData.name,
        formData.email,
        formData.message,
      );

      if (result.success) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setAlert({
          type: "success",
          message:
            "✅ Your message has been sent successfully. We'll get back to you soon!",
        });

        setTimeout(() => setAlert(null), 5000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* HERO */}
      <section
        className="bg-gradient-to-br px-6 py-20"
        style={{ backgroundColor: "var(--base-color)" }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black text-white md:text-7xl">
              Contact Us
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Reach out to Prime Times News for partnerships, inquiries or
              support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[32px] bg-white p-10 shadow-2xl"
        >
          <h2 className="text-4xl font-black text-[#1f1f1f]">Get In Touch</h2>

          <p className="mt-5 text-lg leading-relaxed text-gray-500">
            We’re always open for collaborations, advertising opportunities,
            business inquiries and feedback.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-5">
              <div
                className="rounded-2xl  p-4 text-white"
                style={{ backgroundColor: "var(--base-color)" }}
              >
                <Mail size={24} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <h3 className="text-lg font-bold">contact@primetimes.com</h3>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div
                className="rounded-2xl  p-4 text-white"
                style={{ backgroundColor: "var(--base-color)" }}
              >
                <Phone size={24} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <h3 className="text-lg font-bold">+91 9876543210</h3>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div
                className="rounded-2xl p-4 text-white"
                style={{ backgroundColor: "var(--base-color)" }}
              >
                <MapPin size={24} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Office</p>
                <h3 className="text-lg font-bold">New Delhi, India</h3>
              </div>
            </div>
          </div>

          {/* SOCIALS */}
          <div className="mt-12 flex items-center gap-5">
            <div
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl  text-white transition hover:scale-110"
              style={{ backgroundColor: "var(--base-color)" }}
            >
              <FaInstagram size={24} />
            </div>
            <div
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl  text-white transition hover:scale-110"
              style={{ backgroundColor: "var(--base-color)" }}
            >
              <FaYoutube size={24} />
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[32px] bg-white p-10 shadow-2xl"
        >
          <h2 className="text-4xl font-black text-[#1f1f1f]">Send Message</h2>

          {/* Alert of message sent! */}
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 rounded-2xl border p-4 font-medium ${
                alert.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {alert.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#d10000]"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#d10000]"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Message
              </label>

              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full resize-none rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#d10000]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-3 rounded-2xl px-8 py-4 font-bold text-white shadow-lg shadow-red-200 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
              style={{ backgroundColor: "var(--base-color)" }}
            >
              <Send size={20} />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
