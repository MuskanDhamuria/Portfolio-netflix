import { motion } from "motion/react";

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const playNetflixSound = () => {
    const audio = new Audio("/sounds/netflix.mp3");
    audio.volume = 0.8;
    audio.play().catch(err => console.error(err));
  };

  const handleClick = () => {
    playNetflixSound();
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center cursor-pointer" onClick={handleClick}>
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="text-6xl md:text-8xl lg:text-9xl text-[#E50914] tracking-wider mb-8"
        >
          MUSKAN DHAMURIA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-gray-400 text-sm md:text-base tracking-widest animate-pulse"
        >
          click ↑ to enter
        </motion.p>
      </div>
    </div>
  );
}
