// src/pages/TermsOfService.jsx

import React from "react";
import { motion } from "framer-motion";

const TermsOfService = () => {
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
              Terms of Service
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
              By accessing or using Prime Times News services, you agree to be
              bound by these Terms of Service.
            </p>

            <h2>Use of Services</h2>

            <p>
              You agree to use our platform only for lawful purposes and in
              compliance with all applicable laws and regulations.
            </p>

            <h2>Content</h2>

            <p>
              Prime Times News aggregates and displays news-related content and
              embedded media from third-party sources including YouTube.
            </p>

            <h2>User Conduct</h2>

            <ul>
              <li>No unauthorized use of the platform</li>
              <li>No harmful or malicious activity</li>
              <li>No attempt to disrupt services or servers</li>
              <li>No misuse of intellectual property</li>
            </ul>

            <h2>Disclaimer</h2>

            <p>
              Prime Times News provides content for informational purposes only.
              We do not guarantee uninterrupted availability or complete
              accuracy of third-party content.
            </p>

            <h2>Limitation of Liability</h2>

            <p>
              Prime Times News shall not be held liable for damages arising from
              the use or inability to use the platform.
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

export default TermsOfService;
