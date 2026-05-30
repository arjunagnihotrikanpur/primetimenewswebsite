import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const FloatingSocials = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      <a
        href="https://www.instagram.com/primetimesnewslive/"
        target="_blank"
        rel="noreferrer"
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#E1306C]
          text-white
          shadow-2xl
          transition
          duration-300
          hover:scale-110
        "
      >
        <FaInstagram size={24} />
      </a>

      <a
        href="https://www.facebook.com/primetimesnewslive/"
        target="_blank"
        rel="noreferrer"
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#1877F2]
          text-white
          shadow-2xl
          transition
          duration-300
          hover:scale-110
        "
      >
        <FaFacebookF size={22} />
      </a>
    </div>
  );
};

export default FloatingSocials;
