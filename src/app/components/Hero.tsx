import { motion } from "motion/react";
import { Play, Info } from "lucide-react";

interface HeroProps {
  name: string;
  tagline: string;
  description: string;
  videoUrl: string;
}

export function Hero({ name, tagline, description, videoUrl }: HeroProps) {
  if (!name || !tagline || !description) {
    return null;
  }

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {videoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-16 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-4 text-white tracking-tight">
            {name}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-200">
            {tagline}
          </p>
          <p className="text-base md:text-lg mb-8 text-gray-300 max-w-xl">
            {description}
          </p>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-white/90 transition-colors">
              <Play className="w-5 h-5" fill="currentColor" />
              <span>View Projects</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded hover:bg-gray-500/50 transition-colors">
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
