// src/pages/NotFound.jsx

import React from "react";

import { motion } from "framer-motion";

import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3f4f6] px-5">
      {/* BACKGROUND GLOWS */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-red-600/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-600/20 blur-3xl"></div>

      {/* CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          w-full
          max-w-3xl
          rounded-[40px]
          bg-white
          p-10
          text-center
          shadow-2xl
          md:p-16
        "
      >
        {/* ICON */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
            mx-auto
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            bg-red-100
            text-[#d10000]
          "
        >
          <AlertTriangle size={52} />
        </motion.div>

        {/* 404 */}
        <h1
          className="
            mt-8
            text-7xl
            font-black
            tracking-tight
            text-[#1f1f1f]
            md:text-9xl
          "
        >
          404
        </h1>

        {/* TITLE */}
        <h2
          className="
            mt-5
            text-3xl
            font-black
            text-[#1f1f1f]
            md:text-5xl
          "
        >
          Page Not Found
        </h2>

        {/* DESC */}
        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-lg
            leading-relaxed
            text-gray-500
          "
        >
          The page you are looking for may have been moved, deleted or does not
          exist.
        </p>

        {/* BUTTONS */}
        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-center
            gap-4
            sm:flex-row
          "
        >
          {/* HOME */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => navigate("/")}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-[#d10000]
              px-8
              py-4
              font-bold
              text-white
              shadow-xl
              shadow-red-200
            "
          >
            <Home size={20} />
            Go Home
          </motion.button>

          {/* BACK */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => navigate(-1)}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-white
              px-8
              py-4
              font-bold
              text-[#1f1f1f]
              shadow-lg
            "
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
