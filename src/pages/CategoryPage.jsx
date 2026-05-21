// src/pages/CategoryPage.jsx

import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { ArrowLeft, Eye, Play, ChevronRight } from "lucide-react";

const CategoryPage = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const category = location.state;

  // =========================
  // CATEGORY NOT FOUND
  // =========================

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6]">
        <div className="rounded-3xl bg-white p-10 shadow-2xl">
          <h2 className="mb-4 text-4xl font-black text-[#d10000]">
            Category Not Found
          </h2>

          <button
            onClick={() => navigate("/")}
            className="
              rounded-2xl
              bg-[#d10000]
              px-6
              py-3
              font-bold
              text-white
              transition
              hover:scale-105
            "
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // FILTER VIDEOS
  // =========================

  const visibleVideos = category.videos?.filter((video) => !video.hidden) || [];

  // =========================
  // HELPERS
  // =========================

  const getYoutubeThumbnail = (url) => {
    const videoId = url.split("youtu.be/")[1];

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const getYoutubeVideoId = (url) => {
    return url.split("youtu.be/")[1];
  };

  // =========================
  // OPEN VIDEO
  // =========================

  const openVideo = (video) => {
    navigate(`/video/${video.id}`, {
      state: {
        ...video,

        videoId: getYoutubeVideoId(video.youtubeUrl),

        // IMPORTANT
        recommendedVideos: visibleVideos,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-5 py-10">
      <div className="mx-auto max-w-7xl">
        {/* ========================= */}
        {/* BACK BUTTON */}
        {/* ========================= */}

        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="
            mb-8
            flex
            items-center
            gap-2
            rounded-2xl
            bg-[#d10000]
            px-6
            py-3
            font-bold
            text-white
            shadow-lg
          "
        >
          <ArrowLeft size={18} />
          Back
        </motion.button>

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black text-[#1e1e1e] md:text-6xl">
            {category.title}
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            {visibleVideos.length} Videos Available
          </p>
        </motion.div>

        {/* ========================= */}
        {/* VIDEOS GRID */}
        {/* ========================= */}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.35,
                delay: i * 0.05,
              }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              onClick={() => openVideo(video)}
              className="
                group
                cursor-pointer
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-lg
                transition-all
                duration-300
                hover:shadow-2xl
              "
            >
              {/* THUMBNAIL */}
              <div className="relative overflow-hidden">
                <img
                  src={getYoutubeThumbnail(video.youtubeUrl)}
                  alt={video.title}
                  className="
                    h-[240px]
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                {/* PLAY BUTTON */}
                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    h-16
                    w-16
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-[#d10000]/95
                    text-white
                    shadow-2xl
                  "
                >
                  <Play fill="white" size={24} />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3
                  className="
                    line-clamp-2
                    text-lg
                    font-black
                    text-[#1f1f1f]
                    transition
                    group-hover:text-[#d10000]
                  "
                >
                  {video.title}
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  {/* VIEWS */}
                  <div className="flex items-center gap-2 text-gray-500">
                    <Eye size={16} />

                    <span className="text-sm">{video.views || 0} views</span>
                  </div>

                  {/* ARROW */}
                  <div
                    className="
                      rounded-full
                      bg-[#f5f5f5]
                      p-2
                      text-[#d10000]
                      transition
                      group-hover:translate-x-1
                    "
                  >
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
