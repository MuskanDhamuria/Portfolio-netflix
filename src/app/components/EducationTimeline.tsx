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
  if ((!university || university.length === 0) && (!jc || jc.length === 0)) {
    return null;
  }

  const safeUniversity = university || [];
  const safeJc = jc || [];
  const totalUniversity = safeUniversity.length;

  const renderTimelineSection = (title: string, items: EducationItem[], delayOffset: number) => {
    if (items.length === 0) {
      return null;
    }

    return (
      <section>
        <h3 className="text-gray-300 text-sm md:text-base tracking-wide uppercase mb-5 ml-12 md:ml-16">
          {title}
        </h3>
        <div className="space-y-5 md:space-y-7">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: (delayOffset + index) * 0.12, duration: 0.45 }}
              className="relative flex items-start gap-4 md:gap-6 group cursor-pointer"
              onClick={() => onItemClick(item)}
            >
              <div className="relative z-10 flex-shrink-0 pt-1">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border-2 border-red-500 flex items-center justify-center shadow-[0_0_0_4px_rgba(0,0,0,1)] transition-transform duration-200 group-hover:scale-110">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
              </div>

              <div className="flex-1 pb-1">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/65 hover:bg-zinc-900/90 hover:border-zinc-700 transition-all duration-200 p-4 md:p-5 flex gap-4 md:gap-5">
                  <div className="w-20 h-24 md:w-24 md:h-28 rounded-md overflow-hidden flex-shrink-0 ring-1 ring-zinc-700">
                    <img
                      src={item.thumbnail}
                      alt={item.institution}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="inline-block text-[11px] md:text-xs text-red-300 bg-red-500/10 border border-red-500/30 px-2.5 py-1 rounded-full mb-2">
                      {item.period}
                    </p>
                    <h4 className="text-white text-base md:text-lg leading-tight mb-1">{item.degree}</h4>
                    <p className="text-zinc-300 text-sm md:text-base">{item.institution}</p>
                    {item.details?.achievements?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.details.achievements.slice(0, 3).map((achievement, i) => (
                          <span key={`${item.id}-achievement-${i}`} className="text-xs text-zinc-300 bg-zinc-800 px-2 py-1 rounded-md">
                            {achievement.length > 36 ? `${achievement.substring(0, 36)}...` : achievement}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-white px-8 md:px-16 lg:px-20 mb-8">Education</h2>

      <div className="px-8 md:px-16 lg:px-20">
        <div className="relative pl-1 md:pl-2">
          <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-red-500 via-zinc-700 to-transparent" />
          <div className="space-y-10 md:space-y-12">
            {renderTimelineSection("University", safeUniversity, 0)}
            {renderTimelineSection("Junior College", safeJc, totalUniversity)}
          </div>
        </div>
      </div>
    </div>
  );
}
