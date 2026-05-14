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
      <section className="relative">
        <div className="mb-5 ml-12 md:ml-16">
          <h3 className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/70 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-zinc-200 md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            {title}
          </h3>
        </div>
        <div className="space-y-5 md:space-y-7">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: (delayOffset + index) * 0.12, duration: 0.45 }}
              className="group relative flex items-start gap-4 md:gap-6"
            >
              <div className="relative z-10 flex-shrink-0 pt-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-red-500 bg-black shadow-[0_0_0_4px_rgba(0,0,0,1)] transition-transform duration-200 group-hover:scale-110 md:h-8 md:w-8">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                </div>
              </div>

              <div className="relative flex-1 pb-1">
                <div className="absolute -left-[17px] top-4 h-px w-4 bg-zinc-700 md:-left-[25px] md:w-6" />
                <div className="flex gap-4 rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-4 transition-all duration-200 group-hover:border-zinc-600 group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.35)] md:gap-5 md:p-5">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-zinc-700 md:h-28 md:w-24">
                    <img
                      src={item.thumbnail}
                      alt={item.institution}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="mb-2 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[11px] text-red-200 md:text-xs">
                      {item.period}
                    </p>
                    <h4 className="mb-1 text-base leading-tight text-white md:text-lg">{item.degree}</h4>
                    <p className="text-sm text-zinc-300 md:text-base">{item.institution}</p>
                    <button
                      type="button"
                      onClick={() => onItemClick(item)}
                      className="mt-3 inline-flex rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-200 transition-colors duration-200 hover:bg-red-500/20"
                    >
                      Click me
                    </button>
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
      <h2 className="mb-8 px-8 text-white md:px-16 lg:px-20">Education</h2>

      <div className="px-8 md:px-16 lg:px-20">
        <div className="relative rounded-2xl border border-zinc-900/70 bg-gradient-to-b from-zinc-950/30 to-black/70 p-4 pl-5 md:p-6 md:pl-8">
          <div className="absolute bottom-6 left-[20px] top-6 w-px bg-gradient-to-b from-red-500 via-zinc-700 to-transparent md:left-[30px]" />
          <div className="space-y-10 md:space-y-12">
            {renderTimelineSection("University", safeUniversity, 0)}
            {renderTimelineSection("Junior College", safeJc, totalUniversity)}
          </div>
        </div>
      </div>
    </div>
  );
}
