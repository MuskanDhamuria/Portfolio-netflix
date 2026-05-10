import { motion } from "motion/react";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  thumbnail: string;
  details: {
    achievements: string[];
    courses: string[];
  };
}

interface EducationTimelineProps {
  university: EducationItem[];
  jc: EducationItem[];
  onItemClick: (item: EducationItem) => void;
}

export function EducationTimeline({ university, jc, onItemClick }: EducationTimelineProps) {
  // Safety checks
  if ((!university || university.length === 0) && (!jc || jc.length === 0)) {
    return null;
  }

  const safeUniversity = university || [];
  const safeJc = jc || [];

  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-white px-8 md:px-16 lg:px-20 mb-8">Education</h2>

      <div className="px-8 md:px-16 lg:px-20">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-red-500 to-transparent" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {/* University Section */}
            {safeUniversity.length > 0 && (
              <div className="mb-12">
                <h3 className="text-gray-400 mb-6 ml-12 md:ml-20">University</h3>
                {safeUniversity.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative flex gap-6 md:gap-8 group cursor-pointer"
                  onClick={() => onItemClick(item)}
                >
                  {/* Timeline Dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-red-600 border-4 border-black flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pb-8">
                    <div className="bg-zinc-900/50 rounded-lg p-4 md:p-6 border border-zinc-800 hover:border-red-600 transition-all hover:bg-zinc-900/80 flex gap-4 md:gap-6">
                      {/* Thumbnail */}
                      <div className="w-20 h-28 md:w-28 md:h-40 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.institution}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <p className="text-gray-400 text-xs md:text-sm mb-1">{item.period}</p>
                        <h4 className="text-white mb-1">{item.degree}</h4>
                        <p className="text-gray-300 text-sm md:text-base">{item.institution}</p>
                        {item.details?.achievements && item.details.achievements.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.details.achievements.slice(0, 2).map((achievement, i) => (
                              <span key={i} className="text-xs text-gray-400 bg-zinc-800 px-2 py-1 rounded">
                                {achievement.length > 30 ? achievement.substring(0, 30) + "..." : achievement}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
            )}

            {/* JC Section */}
            {safeJc.length > 0 && (
              <div>
                <h3 className="text-gray-400 mb-6 ml-12 md:ml-20">Junior College</h3>
                {safeJc.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (university.length + index) * 0.2, duration: 0.6 }}
                  className="relative flex gap-6 md:gap-8 group cursor-pointer"
                  onClick={() => onItemClick(item)}
                >
                  {/* Timeline Dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-red-600 border-4 border-black flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pb-8">
                    <div className="bg-zinc-900/50 rounded-lg p-4 md:p-6 border border-zinc-800 hover:border-red-600 transition-all hover:bg-zinc-900/80 flex gap-4 md:gap-6">
                      {/* Thumbnail */}
                      <div className="w-20 h-28 md:w-28 md:h-40 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.institution}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <p className="text-gray-400 text-xs md:text-sm mb-1">{item.period}</p>
                        <h4 className="text-white mb-1">{item.degree}</h4>
                        <p className="text-gray-300 text-sm md:text-base">{item.institution}</p>
                        {item.details?.achievements && item.details.achievements.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.details.achievements.slice(0, 2).map((achievement, i) => (
                              <span key={i} className="text-xs text-gray-400 bg-zinc-800 px-2 py-1 rounded">
                                {achievement.length > 30 ? achievement.substring(0, 30) + "..." : achievement}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
