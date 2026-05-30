import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, Play, ChevronRight } from "lucide-react";

const ChannelPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const channel = location.state;

  if (!channel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6]">
        <div className="rounded-3xl bg-white p-10 shadow-2xl">
          <h2 className="mb-4 text-4xl font-black text-[#d10000]">
            Channel Not Found
          </h2>

          <button
            onClick={() => navigate("/")}
            className="rounded-2xl bg-[#d10000] px-6 py-3 font-bold text-white"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const videos = channel.videos || [];

  const getYoutubeThumbnail = (url) => {
    const videoId = getYoutubeVideoId(url);

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const getYoutubeVideoId = (url) => {
    try {
      if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1].split("?")[0];
      }

      if (url.includes("watch?v=")) {
        return new URL(url).searchParams.get("v");
      }

      return "";
    } catch {
      return "";
    }
  };

  const openVideo = (video) => {
    navigate(`/video/${video.id}`, {
      state: {
        ...video,
        videoId: getYoutubeVideoId(video.youtubeUrl),
        recommendedVideos: videos,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 rounded-2xl bg-[#d10000] px-6 py-3 font-bold text-white shadow-lg"
        >
          <ArrowLeft size={18} />
          Back
        </motion.button>

        <div className="mb-12">
          <div className="mb-8 flex h-[250px] items-center justify-center overflow-hidden rounded-[30px] bg-white shadow-xl">
            <img
              src={channel.thumbnail}
              alt={channel.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-lg">
              <img
                src={channel.thumbnail}
                alt={channel.name}
                className="max-h-20 max-w-20 object-contain"
              />
            </div>

            <div>
              <h1 className="text-5xl font-black text-[#1e1e1e] md:text-6xl">
                {channel.name}
              </h1>

              <p className="mt-2 text-lg text-gray-500">
                {videos.length} Videos Available
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ y: -10 }}
              onClick={() => openVideo(video)}
              className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={getYoutubeThumbnail(video.youtubeUrl)}
                  alt={video.title}
                  className="h-[240px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d10000]/95 text-white">
                  <Play fill="white" size={24} />
                </div>
              </div>

              <div className="p-5">
                <h3 className="line-clamp-2 text-lg font-black">
                  {video.title}
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Eye size={16} />
                    <span>{video.views || 0} views</span>
                  </div>

                  <div className="rounded-full bg-[#f5f5f5] p-2 text-[#d10000]">
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

export default ChannelPage;
