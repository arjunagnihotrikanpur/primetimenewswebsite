// src/pages/CookiePolicy.jsx

import React from "react";
import { motion } from "framer-motion";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#d10000] to-[#850000] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black text-white md:text-7xl">
              Cookie Policy
            </h1>

            <p className="mt-5 text-lg text-white/80">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto max-w-5xl px-5 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-[32px] bg-white p-10 shadow-2xl"
        >
          <div className="prose prose-lg max-w-none">
            <p>
              Prime Times News uses cookies and similar technologies to improve
              user experience, analyze traffic and optimize our services.
            </p>

            <h2>What Are Cookies?</h2>

            <p>
              Cookies are small text files stored on your device that help
              websites remember information about your visit.
            </p>

            <h2>How We Use Cookies</h2>

            <ul>
              <li>To improve website performance</li>
              <li>To remember user preferences</li>
              <li>To analyze usage statistics</li>
              <li>To enhance security and reliability</li>
            </ul>

            <h2>Third-Party Cookies</h2>

            <p>
              Some embedded services such as YouTube or analytics providers may
              use their own cookies while interacting with our platform.
            </p>

            <h2>Managing Cookies</h2>

            <p>
              You can manage or disable cookies through your browser settings.
              Disabling cookies may affect some website functionality.
            </p>

            <h2>Contact</h2>

            <p>
              Prime Times News
              <br />
              Civil Lines, Kanpur
              <br />
              contact@primetimesnews.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
