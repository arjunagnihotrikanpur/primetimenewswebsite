// src/pages/Home.jsx

import React, { useEffect, useMemo, useState } from "react";
import { getAllCategories } from "../services/data.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Globe,
  Mic,
  Play,
  ChevronRight,
  TrendingUp,
  Eye,
  Flame,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();

        if (isMounted) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

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

  const getIcon = (icon) => {
    switch (icon) {
      case "mic":
        return <Mic size={24} />;

      case "globe":
        return <Globe size={24} />;

      default:
        return <TrendingUp size={24} />;
    }
  };

  // =========================
  // OPEN VIDEO
  // =========================

  const openVideo = (video, recommendedVideos = []) => {
    navigate(`/video/${video.id}`, {
      state: {
        ...video,

        videoId: getYoutubeVideoId(video.youtubeUrl),

        recommendedVideos,
      },
    });
  };

  // =========================
  // FEATURED VIDEOS
  // =========================

  const featuredVideos = useMemo(() => {
    return categories.flatMap((category) => {
      const visibleVideos =
        category.videos?.filter((video) => !video.hidden) || [];

      return visibleVideos
        .filter((video) => video.featured)
        .map((video) => ({
          ...video,

          categoryTitle: category.title,

          // IMPORTANT
          recommendedVideos: visibleVideos,
        }));
    });
  }, [categories]);

  return (
    <>
      <div className="min-h-screen bg-[#f3f4f6]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#d10000] to-[#850000] px-6 py-20">
          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-md">
                <TrendingUp size={16} />
                Live & Trending News
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">
                Watch Breaking News Anytime
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
                Stream the latest Indian and International news channels.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 py-14">
          {/* ========================= */}
          {/* BREAKING NEWS */}
          {/* ========================= */}

          {featuredVideos.length > 0 && (
            <div className="mb-24">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-[#d10000] p-4 text-white">
                  <Flame size={24} />
                </div>

                <div>
                  <h2 className="text-4xl font-black text-[#1e1e1e]">
                    Breaking News
                  </h2>

                  <p className="text-gray-500">
                    Featured videos & latest updates
                  </p>
                </div>
              </div>

              {/* BIGGER FEATURED SECTION */}
              <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
                {featuredVideos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -10 }}
                    viewport={{ once: true }}
                    onClick={() => openVideo(video, video.recommendedVideos)}
                    className="
                    group
                    cursor-pointer
                    overflow-hidden
                    rounded-[36px]
                    bg-black
                    shadow-2xl
                  "
                  >
                    <div className="relative">
                      {/* BIGGER IMAGE */}
                      <img
                        src={getYoutubeThumbnail(video.youtubeUrl)}
                        alt={video.title}
                        className="
                        h-[320px]
                        w-full
                        object-cover
                        transition
                        duration-700
                        group-hover:scale-110
                        md:h-[420px]
                      "
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                      {/* BADGE */}
                      <div
                        className="
                        absolute
                        left-5
                        top-5
                        rounded-full
                        bg-red-600
                        px-5
                        py-2
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-white
                      "
                      >
                        Breaking
                      </div>

                      {/* CONTENT */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <p className="mb-3 text-sm text-red-300">
                          {video.categoryTitle}
                        </p>

                        <h3
                          className="
                          max-w-2xl
                          text-3xl
                          font-black
                          leading-tight
                          text-white
                          md:text-4xl
                        "
                        >
                          {video.title}
                        </h3>

                        <div className="mt-5 flex items-center gap-4">
                          <div className="flex items-center gap-2 text-white/80">
                            <Eye size={18} />

                            <span>{video.views || 0} views</span>
                          </div>
                        </div>
                      </div>

                      {/* PLAY BUTTON */}
                      <div
                        className="
                        absolute
                        right-6
                        top-6
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-[#d10000]
                        text-white
                        shadow-2xl
                      "
                      >
                        <Play fill="white" size={32} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ========================= */}
          {/* CATEGORY SECTIONS */}
          {/* ========================= */}

          {categories.map((category, index) => {
            const visibleVideos =
              category.videos?.filter((video) => !video.hidden) || [];

            if (visibleVideos.length === 0) return null;

            return (
              <motion.div
                key={index}
                className="mb-20"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
              >
                {/* HEADER */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-[#d10000] p-4 text-white shadow-lg">
                      {getIcon(category.icon)}
                    </div>

                    <div>
                      <h2 className="text-3xl font-black text-[#1e1e1e]">
                        {category.title}
                      </h2>

                      <p className="text-gray-500">
                        {visibleVideos.length} Videos
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/category/${category.id}`, {
                        state: category,
                      })
                    }
                    className="
                    hidden
                    items-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-5
                    py-3
                    font-semibold
                    text-[#d10000]
                    shadow-md
                    transition
                    hover:scale-105
                    md:flex
                  "
                  >
                    View All
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* VIDEOS */}
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
                      whileHover={{ y: -8 }}
                      viewport={{ once: true }}
                      onClick={() => openVideo(video, visibleVideos)}
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
                          h-[220px]
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-110
                        "
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                        {/* PLAY */}
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
                          font-bold
                          text-[#1f1f1f]
                          transition
                          group-hover:text-[#d10000]
                        "
                        >
                          {video.title}
                        </h3>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Eye size={16} />
                            {video.views || 0} views
                          </div>

                          <div className="rounded-full bg-[#f5f5f5] p-2 text-[#d10000]">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
