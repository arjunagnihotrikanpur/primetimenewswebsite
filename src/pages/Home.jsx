// src/pages/Home.jsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getAllCategories, getAllChannels } from "../services/data.js";
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
import { useTheme } from "../context/ThemeContext";

// =========================
// CONFIG
// =========================
const INITIAL_VISIBLE = 8; // videos shown per category on first render
const LOAD_STEP = 8; // videos added each time the sentinel is hit

// =========================
// HOOK: useInView
// Mounts a sentinel <div> ref; fires `onIntersect` once it enters the
// viewport (with a rootMargin so it fires slightly before it's visible).
// =========================
function useInView(onIntersect, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      { rootMargin: "400px 0px" }, // start loading before it's on screen
    );

    observer.observe(node);
    return () => observer.disconnect();
    // Re-creating the observer whenever `deps` changes forces an immediate
    // recheck of the sentinel's current position (observe() always fires
    // once right away). Without this, if the sentinel is still on-screen
    // after a batch loads, no new "enter" transition ever happens and
    // pagination silently stalls after the first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

// =========================
// COMPONENT: VideoCard
// Extracted so it's memoized and images use native lazy-loading.
// =========================
const VideoCard = React.memo(function VideoCard({
  video,
  index,
  getYoutubeThumbnail,
  onOpen,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: (index % LOAD_STEP) * 0.05 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: "100px" }}
      onClick={onOpen}
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
          loading="lazy"
          decoding="async"
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
          text-white
          shadow-2xl
        "
          style={{ backgroundColor: "var(--base-color)" }}
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

          <div
            className="rounded-full bg-[#f5f5f5] p-2"
            style={{ color: "var(--base-color)" }}
          >
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// =========================
// COMPONENT: CategorySection
// Owns its own "visible count" so each category paginates independently
// as the user scrolls toward it.
// =========================
function CategorySection({
  category,
  visibleVideos,
  getIcon,
  getYoutubeThumbnail,
  openVideo,
  navigate,
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + LOAD_STEP, visibleVideos.length));
  }, [visibleVideos.length]);

  const sentinelRef = useInView(loadMore, [visibleCount, visibleVideos.length]);

  const videosToRender = visibleVideos.slice(0, visibleCount);
  const hasMore = visibleCount < visibleVideos.length;

  return (
    <motion.div
      className="mb-20"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
    >
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="rounded-2xl  p-4 text-white shadow-lg"
            style={{ backgroundColor: "var(--base-color)" }}
          >
            {getIcon(category.icon)}
          </div>

          <div>
            <h2 className="text-3xl font-black text-[#1e1e1e]">
              {category.title}
            </h2>

            <p className="text-gray-500">{visibleVideos.length} Videos</p>
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
          shadow-md
          transition
          hover:scale-105
          md:flex
        "
          style={{ color: "var(--base-color)" }}
        >
          View All
          <ChevronRight size={18} />
        </button>
      </div>

      {/* VIDEOS */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videosToRender.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            index={i}
            getYoutubeThumbnail={getYoutubeThumbnail}
            onOpen={() => openVideo(video, visibleVideos)}
          />
        ))}
      </div>

      {/* SENTINEL: triggers loading the next batch when scrolled near */}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--base-color)]" />
        </div>
      )}
    </motion.div>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);

  // how many category SECTIONS are mounted (in addition to per-category
  // video pagination above) — keeps the page from mounting 15 sections at once
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(3);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [categoriesData, channelsData] = await Promise.all([
          getAllCategories(),
          getAllChannels(),
        ]);

        if (isMounted) {
          setCategories(categoriesData);
          setChannels(channelsData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

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
          recommendedVideos: visibleVideos,
        }));
    });
  }, [categories]);

  // Precompute non-empty categories once so pagination logic is simple
  const renderableCategories = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          visibleVideos: category.videos?.filter((v) => !v.hidden) || [],
        }))
        .filter((c) => c.visibleVideos.length > 0),
    [categories],
  );

  const categoriesToRender = renderableCategories.slice(
    0,
    visibleCategoryCount,
  );
  const hasMoreCategories = visibleCategoryCount < renderableCategories.length;

  const loadMoreCategories = useCallback(() => {
    setVisibleCategoryCount((prev) => prev + 2);
  }, []);

  const categorySentinelRef = useInView(loadMoreCategories, [
    visibleCategoryCount,
    renderableCategories.length,
  ]);

  // Featured hero: click-to-play instead of autoplaying an iframe on load.
  // Autoplaying a YouTube iframe the instant the page renders is one of the
  // heaviest things on this page — this defers it until the user asks for it.
  const [heroPlaying, setHeroPlaying] = useState(false);
  const heroIframeRef = useRef(null);
  const heroContainerRef = useRef(null);

  // Auto-pause the hero video once it's scrolled out of view.
  useEffect(() => {
    if (!heroPlaying) return;
    const node = heroContainerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const iframe = heroIframeRef.current;
        if (!iframe || !iframe.contentWindow) return;

        const command = entry.isIntersecting ? "playVideo" : "pauseVideo";
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: command, args: [] }),
          "*",
        );
      },
      { threshold: 0.25 }, // consider it "out of view" once mostly scrolled past
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [heroPlaying]);

  return (
    <>
      <div className="min-h-screen bg-[#f3f4f6]">
        {/* HERO */}
        <section
          className="relative overflow-hidden bg-gradient-to-br px-6 py-20"
          style={{ backgroundColor: "var(--base-color)" }}
        >
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
                {theme.homeTitle}
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
                <div
                  className="rounded-2xl p-4 text-white"
                  style={{ backgroundColor: theme.baseColor }}
                >
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
              <div className="flex justify-center">
                {featuredVideos[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="
        w-full
        max-w-6xl
        overflow-hidden
        rounded-[36px]
        bg-black
        shadow-2xl
      "
                  >
                    <div
                      ref={heroContainerRef}
                      className="relative aspect-video w-full"
                    >
                      {heroPlaying ? (
                        <iframe
                          ref={heroIframeRef}
                          className="h-full w-full"
                          src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                            featuredVideos[0].youtubeUrl,
                          )}?autoplay=1&rel=0&enablejsapi=1&origin=${
                            typeof window !== "undefined"
                              ? window.location.origin
                              : ""
                          }`}
                          title={featuredVideos[0].title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setHeroPlaying(true)}
                          className="group relative h-full w-full"
                        >
                          <img
                            src={getYoutubeThumbnail(
                              featuredVideos[0].youtubeUrl,
                            )}
                            alt={featuredVideos[0].title}
                            loading="eager"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-2xl transition group-hover:scale-110"
                              style={{ backgroundColor: "var(--base-color)" }}
                            >
                              <Play fill="white" size={32} />
                            </div>
                          </div>
                        </button>
                      )}
                    </div>

                    <div className="bg-white p-8">
                      <p className="mb-3 text-sm font-semibold text-[#d10000]">
                        {featuredVideos[0].categoryTitle}
                      </p>

                      <h3 className="text-3xl font-black text-[#1f1f1f] md:text-5xl">
                        {featuredVideos[0].title}
                      </h3>

                      <div className="mt-4 flex items-center gap-2 text-gray-600">
                        <Eye size={18} />
                        {featuredVideos[0].views || 0} views
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* ========================= */}
          {/* CHANNELS */}
          {/* ========================= */}

          {channels.length > 0 && (
            <div className="mb-24">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-black text-[#1e1e1e]">
                    News Channels
                  </h2>

                  <p className="text-gray-500">
                    Watch videos from your favorite channels
                  </p>
                </div>

                <button
                  onClick={() => navigate("/channels")}
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

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {channels.map((channel) => (
                  <motion.div
                    key={channel.id}
                    whileHover={{ y: -8 }}
                    onClick={() =>
                      navigate(`/channel/${channel.id}`, {
                        state: channel,
                      })
                    }
                    className="
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
                    <div className="flex h-[220px] items-center justify-center bg-[#fafafa] p-6">
                      <img
                        src={channel.thumbnail}
                        alt={channel.name}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="border-t border-gray-100 p-5">
                      <h3 className="text-xl font-black text-[#1f1f1f]">
                        {channel.name}
                      </h3>

                      <div className="mt-2 text-sm text-gray-500">
                        {(channel.videos || []).length} Videos
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ========================= */}
          {/* CATEGORY SECTIONS — paginated, mounted incrementally on scroll */}
          {/* ========================= */}

          {categoriesToRender.map(({ category, visibleVideos }, index) => (
            <CategorySection
              key={category.id ?? index}
              category={category}
              visibleVideos={visibleVideos}
              getIcon={getIcon}
              getYoutubeThumbnail={getYoutubeThumbnail}
              openVideo={openVideo}
              navigate={navigate}
            />
          ))}

          {/* Sentinel that reveals the NEXT category sections as user scrolls */}
          {hasMoreCategories && (
            <div
              ref={categorySentinelRef}
              className="flex justify-center py-10"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--base-color)]" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
