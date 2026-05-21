// src/pages/DownloadApp.jsx

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Download, PlayCircle, ShieldCheck } from "lucide-react";

const DownloadApp = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#d10000] to-[#850000] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-white backdrop-blur-md">
              <Smartphone size={18} />
              Prime Times Mobile App
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">
              Watch News Anywhere
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/80">
              Download the Prime Times News app for live TV, breaking news,
              instant alerts and smooth streaming experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="rounded-[32px] bg-white p-10 shadow-2xl"
        >
          <h2 className="text-4xl font-black text-[#1f1f1f]">Why Download?</h2>

          <div className="mt-10 space-y-8">
            <div className="flex items-start gap-5">
              <div className="rounded-2xl bg-[#d10000] p-4 text-white">
                <PlayCircle size={24} />
              </div>

              <div>
                <h3 className="text-xl font-bold">Live News Streaming</h3>

                <p className="mt-2 text-gray-500">
                  Watch Indian and International news channels live anytime.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="rounded-2xl bg-[#d10000] p-4 text-white">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="text-xl font-bold">Fast & Secure</h3>

                <p className="mt-2 text-gray-500">
                  Optimized for smooth playback and instant breaking alerts.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="rounded-[32px] bg-white p-10 shadow-2xl"
        >
          <h2 className="text-4xl font-black text-[#1f1f1f]">Download Now</h2>

          <p className="mt-5 text-lg text-gray-500">
            Get the latest version of Prime Times News App for Android devices.
          </p>

          <button
            className="
              mt-10
              flex
              items-center
              gap-4
              rounded-2xl
              bg-[#d10000]
              px-8
              py-5
              text-lg
              font-bold
              text-white
              shadow-xl
              shadow-red-200
              transition
              hover:scale-105
            "
          >
            <Download size={24} />
            Download APK
          </button>

          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5">
            <p className="text-sm font-medium text-red-700">
              Latest Version: v1.0.0
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Compatible with Android 8.0 and above.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DownloadApp;
