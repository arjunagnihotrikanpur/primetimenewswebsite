// src/pages/PrivacyPolicy.jsx

import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
              Privacy Policy
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
              Prime Times News, located in Civil Lines, Kanpur, values your
              privacy and is committed to protecting your personal information.
              This Privacy Policy explains how we collect, use and safeguard
              your information while using our website and mobile applications.
            </p>

            <h2>Information We Collect</h2>

            <p>
              We may collect information including your name, email address,
              device information, IP address and usage analytics when you use
              our services.
            </p>

            <h2>How We Use Information</h2>

            <ul>
              <li>To improve our website and services</li>
              <li>To personalize user experience</li>
              <li>To provide customer support</li>
              <li>To monitor traffic and analytics</li>
              <li>To send updates or important notices</li>
            </ul>

            <h2>Third-Party Services</h2>

            <p>
              Our platform may use third-party services including YouTube,
              analytics providers and advertising services which may collect
              information according to their own privacy policies.
            </p>

            <h2>Data Security</h2>

            <p>
              We implement industry-standard security measures to help protect
              your information against unauthorized access, misuse or
              disclosure.
            </p>

            <h2>Contact Us</h2>

            <p>
              If you have questions regarding this Privacy Policy, please
              contact Prime Times News at:
            </p>

            <p>
              Civil Lines, Kanpur
              <br />
              Email: contact@primetimesnews.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
