import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

interface ConnectItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
}

interface ConnectSectionProps {
  items: ConnectItem[];
}

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Mail,
};

const accentMap: Record<string, string> = {
  github: "from-zinc-500/30 to-zinc-900/40",
  linkedin: "from-sky-500/30 to-blue-900/40",
  email: "from-rose-500/30 to-orange-900/40",
};

export function ConnectSection({ items }: ConnectSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 md:mb-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-4 sm:p-6 md:p-8">
        <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 sm:h-44 sm:w-44 rounded-full bg-red-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-28 w-28 sm:h-40 sm:w-40 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative z-10 mb-5 sm:mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl tracking-tight">Connect with Me</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon || ""] || Mail;
            const accent = accentMap[item.title.toLowerCase()] || "from-red-500/30 to-zinc-900/40";
            const ctaText = item.title.toLowerCase() === "email" ? "Send message" : `Visit ${item.title}`;

            return (
              <motion.a
                key={item.id}
                href={item.url}
                target={item.url.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative flex min-h-[170px] sm:min-h-[190px] overflow-hidden rounded-lg sm:rounded-xl border border-white/10 bg-zinc-900/55 p-4 sm:p-5 transition-colors hover:border-white/30"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-40 transition-opacity duration-300 group-hover:opacity-65`} />
                <div className="relative z-10 flex w-full flex-col">
                  <div className="mb-3 sm:mb-4 inline-flex w-fit rounded-lg border border-white/20 bg-black/30 p-2 sm:p-2.5">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg text-white">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-200">
                    {item.description || "Let's connect."}
                  </p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white">
                    {ctaText}
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
