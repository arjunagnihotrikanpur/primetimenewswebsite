// src/pages/VideoPlayer.jsx

import React, { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  PlayCircle,
  Share2,
  Eye,
  Check,
  Clock3,
  ChevronRight,
} from "lucide-react";

import { getVideoById, incrementVideoViews } from "../services/data";

const VideoPlayer = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { id } = useParams();

  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(true);

  const [video, setVideo] = useState(location.state || null);

  const [recommendedVideos, setRecommendedVideos] = useState(
    location.state?.recommendedVideos || [],
  );

  // =========================
  // FETCH VIDEO IF DIRECT LINK
  // =========================

  useEffect(() => {
    const fetchVideo = async () => {
      // Already available through navigation
      if (location.state) {
        setLoading(false);

        return;
      }

      incrementVideoViews(id);

      try {
        const data = await getVideoById(id);

        if (data) {
          setVideo({
            ...data.video,

            videoId: data.video.youtubeUrl.split("youtu.be/")[1],
          });

          setRecommendedVideos(data.recommendedVideos);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchVideo();
  }, [id, location.state]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#d10000] border-t-transparent"></div>
      </div>
    );
  }

  // =========================
  // VIDEO NOT FOUND
  // =========================

  if (!video) {
    return (
      <>
        <Helmet>
          <title>{video.title} | Prime Times News</title>

          <meta name="description" content={video.title} />

          <meta property="og:title" content={video.title} />

          <meta property="og:description" content={video.title} />

          <link
            rel="canonical"
            href={`https://yourdomain.com/video/${video.id}`}
          />
        </Helmet>
        <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6]">
          <div className="rounded-3xl bg-white p-10 shadow-2xl">
            <h2 className="mb-5 text-3xl font-black text-[#d10000]">
              Video Not Found
            </h2>

            <button
              onClick={() => navigate("/")}
              className="
            rounded-xl
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
      </>
    );
  }

  // =========================
  // SHARE
  // =========================

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

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
  // OPEN RECOMMENDED VIDEO
  // =========================

  const openVideo = (selectedVideo) => {
    navigate(`/video/${selectedVideo.id}`, {
      state: {
        ...selectedVideo,

        videoId: getYoutubeVideoId(selectedVideo.youtubeUrl),

        recommendedVideos,
      },
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-4 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* TOP ACTIONS */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* BACK */}
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="
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
            <ArrowLeft size={20} />
            Back
          </motion.button>

          {/* SHARE */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-white
              px-6
              py-3
              font-bold
              text-[#d10000]
              shadow-lg
            "
          >
            {copied ? <Check size={20} /> : <Share2 size={20} />}

            {copied ? "Copied!" : "Share"}
          </motion.button>
        </div>

        {/* PLAYER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="
            overflow-hidden
            rounded-[32px]
            bg-black
            shadow-2xl
          "
        >
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* INFO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="
            mt-8
            rounded-3xl
            bg-white
            p-8
            shadow-lg
          "
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="rounded-2xl bg-[#d10000] p-3 text-white">
              <PlayCircle size={24} />
            </div>

            <span
              className="
                rounded-full
                bg-red-100
                px-4
                py-2
                text-sm
                font-bold
                text-[#d10000]
              "
            >
              LIVE NEWS
            </span>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-gray-100
                px-4
                py-2
                text-sm
                font-semibold
                text-gray-700
              "
            >
              <Eye size={16} />
              {video.views || 0} views
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-gray-100
                px-4
                py-2
                text-sm
                font-semibold
                text-gray-700
              "
            >
              <Clock3 size={16} />
              Live Coverage
            </div>
          </div>

          <h1
            className="
              text-3xl
              font-black
              leading-tight
              text-[#1f1f1f]
              md:text-5xl
            "
          >
            {video.title}
          </h1>

          <p
            className="
              mt-5
              max-w-3xl
              text-lg
              leading-relaxed
              text-gray-600
            "
          >
            Watch the latest live coverage and breaking updates directly from
            YouTube with a smooth and immersive viewing experience.
          </p>
        </motion.div>

        {/* RECOMMENDED */}
        {recommendedVideos.filter((v) => v.id !== video.id).length > 0 && (
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-12 w-2 rounded-full bg-[#d10000]" />

              <h2 className="text-4xl font-black text-[#1f1f1f]">
                Recommended Videos
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {recommendedVideos
                .filter((v) => !v.hidden && v.id !== video.id)
                .slice(0, 6)
                .map((recommended, index) => (
                  <motion.div
                    key={recommended.id}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    whileHover={{ y: -8 }}
                    onClick={() => openVideo(recommended)}
                    className="
                      group
                      cursor-pointer
                      overflow-hidden
                      rounded-3xl
                      bg-white
                      shadow-xl
                      transition-all
                      duration-300
                      hover:shadow-2xl
                    "
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={getYoutubeThumbnail(recommended.youtubeUrl)}
                        alt={recommended.title}
                        className="
                          h-[220px]
                          w-full
                          object-cover
                          transition
                          duration-700
                          group-hover:scale-110
                        "
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

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
                        <PlayCircle size={28} fill="white" />
                      </div>
                    </div>

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
                        {recommended.title}
                      </h3>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Eye size={16} />

                          <span className="text-sm">
                            {recommended.views || 0} views
                          </span>
                        </div>

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
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
