import React, { useEffect, useState } from "react";
import { getAllChannels } from "../services/data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Video } from "lucide-react";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllChannels().then(setChannels);
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <section className="bg-gradient-to-br from-[#d10000] to-[#850000] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-black text-white md:text-7xl">
            News Channels
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {channels.map((channel) => (
            <motion.div
              key={channel.id}
              whileHover={{ y: -8 }}
              onClick={() =>
                navigate(`/channel/${channel.id}`, {
                  state: channel,
                })
              }
              className="cursor-pointer overflow-hidden rounded-[30px] bg-white shadow-xl"
            >
              <div className="flex h-[220px] items-center justify-center bg-[#fafafa] p-6">
                <img
                  src={channel.thumbnail}
                  alt={channel.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-black">{channel.name}</h2>

                <div className="mt-4 flex items-center gap-2 text-gray-500">
                  <Video size={18} />
                  {(channel.videos || []).length} Videos
                </div>

                <div className="mt-8 flex justify-end">
                  <ChevronRight />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channels;
