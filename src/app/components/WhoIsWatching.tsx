import { motion } from "motion/react";

interface Profile {
  id: string;
  name: string;
  color: string;
  avatarImage?: string;
}

interface WhoIsWatchingProps {
  onSelectProfile: () => void;
}

export function WhoIsWatching({ onSelectProfile }: WhoIsWatchingProps) {
  const baseUrl = import.meta.env.BASE_URL;
  const profiles: Profile[] = [
    { id: "1", name: "You", color: "#00CED1" },
    { id: "2", name: "Me", color: "#f0e54a", avatarImage: `${baseUrl}images/muskan.png` },
  ];

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-['Inter'] text-white text-4xl md:text-5xl lg:text-6xl mb-12 md:mb-16"
        >
          Who's Watching?
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id || `profile-${index}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.1 }}
              onClick={onSelectProfile}
              className="cursor-pointer group"
            >
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden mb-3 border-4 border-transparent group-hover:border-white transition-all duration-300"
                  style={{ backgroundColor: profile.avatarImage ? "transparent" : profile.color }}
                >
                  {profile.avatarImage ? (
                    <img
                      src={profile.avatarImage}
                      alt={`${profile.name} avatar`}
                      className="block w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Simple smiley face */}
                      <circle cx="35" cy="40" r="4" fill="black" />
                      <circle cx="65" cy="40" r="4" fill="black" />
                      <path
                        d="M 30 60 Q 50 75 70 60"
                        stroke="black"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Name */}
                <p className="text-gray-400 group-hover:text-white transition-colors text-base md:text-lg">
                  {profile.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 md:mt-16 px-6 py-3 border-2 border-gray-600 text-gray-400 hover:border-white hover:text-white transition-colors tracking-widest text-sm md:text-base"
        >
          MANAGE PROFILES
        </motion.button>
      </div>
    </div>
  );
}
