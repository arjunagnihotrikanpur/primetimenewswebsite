// src/pages/Categories.jsx

import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Globe, Mic, TrendingUp, ChevronRight, Video } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const getIcon = (icon) => {
    switch (icon) {
      case "mic":
        return <Mic size={34} />;
      case "globe":
        return <Globe size={34} />;
      default:
        return <TrendingUp size={34} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#d10000] to-[#850000] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black text-white md:text-7xl">
              News Categories
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Explore all available news categories and watch trending stories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => {
            const visibleVideos =
              category.videos?.filter((video) => !video.hidden) || [];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                onClick={() =>
                  navigate(`/category/${category.id}`, {
                    state: category,
                  })
                }
                className="group cursor-pointer overflow-hidden rounded-[30px] bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                {/* ICON */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#d10000] text-white shadow-lg shadow-red-200">
                  {getIcon(category.icon)}
                </div>

                {/* TITLE */}
                <h2 className="text-3xl font-black text-[#1f1f1f]">
                  {category.title}
                </h2>

                {/* STATS */}
                <div className="mt-5 flex items-center gap-3 text-gray-500">
                  <Video size={18} />
                  <span>{visibleVideos.length} Videos</span>
                </div>

                {/* BUTTON */}
                <div className="mt-8 flex items-center justify-between">
                  <span className="font-semibold text-[#d10000]">
                    Explore Category
                  </span>

                  <div className="rounded-full bg-[#f5f5f5] p-3 text-[#d10000] transition group-hover:translate-x-1">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
