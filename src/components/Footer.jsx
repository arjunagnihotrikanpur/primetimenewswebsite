// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Mail, Phone, MapPin } from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0f1115] text-white">
      {/* TOP RED LINE */}
      <div className="h-[4px] w-full bg-[#d10000]" />

      {/* BACKGROUND GLOW */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-red-700/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-700/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-5 py-16">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <img
              src={logo}
              alt="Prime Times News"
              className="h-24 w-auto object-contain"
            />

            <p className="mt-5 text-[15px] leading-relaxed text-gray-400">
              Prime Times News delivers breaking Indian and International news
              with fast updates, live channels and modern streaming experience.
            </p>

            {/* SOCIALS */}
            <div className="mt-8 flex items-center gap-4">
              {[
                {
                  icon: <FaInstagram size={18} />,
                  link: "https://instagram.com",
                },
                {
                  icon: <FaYoutube size={18} />,
                  link: "https://youtube.com",
                },
                {
                  icon: <FaFacebookF size={18} />,
                  link: "https://facebook.com",
                },
                {
                  icon: <FaXTwitter size={18} />,
                  link: "https://twitter.com",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/5
                    text-gray-300
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-[#d10000]
                    hover:text-white
                  "
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-2xl font-black">Quick Links</h3>

            <div className="mt-7 flex flex-col gap-4">
              {[
                {
                  title: "Home",
                  path: "/",
                },
                {
                  title: "Categories",
                  path: "/categories",
                },
                {
                  title: "Contact",
                  path: "/contact",
                },
                {
                  title: "Download App",
                  path: "/download-app",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    text-gray-400
                    transition
                    hover:text-white
                  "
                >
                  <ChevronRight
                    size={18}
                    className="
                      text-[#d10000]
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />

                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-2xl font-black">Popular Categories</h3>

            <div className="mt-7 flex flex-col gap-4">
              {[
                "Indian News",
                "International News",
                "Politics",
                "Business",
                "Sports",
                "Technology",
              ].map((category, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-3
                    text-gray-400
                  "
                >
                  <div className="h-2 w-2 rounded-full bg-[#d10000]" />

                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-2xl font-black">Contact</h3>

            <div className="mt-7 space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-[#d10000] p-3 text-white">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>

                  <p className="mt-1 text-gray-300">contact@primetimes.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-[#d10000] p-3 text-white">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>

                  <p className="mt-1 text-gray-300">+91 9876543210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-[#d10000] p-3 text-white">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>

                  <p className="mt-1 text-gray-300">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-[1px] w-full bg-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Prime Times News. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              className="transition hover:text-white"
            >
              Terms of Service
            </Link>

            <Link to="/cookie-policy" className="transition hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
