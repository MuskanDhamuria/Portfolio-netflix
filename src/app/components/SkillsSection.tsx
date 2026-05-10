import { motion } from "motion/react";
import { Code, Layout, BarChart, Shield, Wrench, Globe } from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
  thumbnail: string;
}

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const iconMap: { [key: string]: any } = {
  Code,
  Layout,
  BarChart,
  Shield,
  Wrench,
  Globe,
};

export function SkillsSection({ categories }: SkillsSectionProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-white px-8 md:px-16 lg:px-20 mb-8">My Skills</h2>

      <div className="px-8 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Code;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800 hover:border-red-600 transition-all hover:bg-zinc-900/80 h-full">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                      <IconComponent className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="text-white">{category.title}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={`${category.id}-skill-${skillIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        className="px-3 py-1.5 bg-zinc-800 text-gray-300 text-sm rounded hover:bg-zinc-700 hover:text-white transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
