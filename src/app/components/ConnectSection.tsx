import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";

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
    <section className="mb-8 md:mb-12 px-8 md:px-16 lg:px-20">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-6 md:p-8">
        <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-red-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-14 bottom-0 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative z-10 mb-6 flex items-center justify-between">
          <h2 className="text-white text-2xl md:text-3xl tracking-tight">Connect with Me</h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/55 p-5 transition-colors hover:border-white/30"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-40 transition-opacity duration-300 group-hover:opacity-65`} />
                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-lg border border-white/20 bg-black/30 p-2.5">
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg text-white">{item.title}</h3>
                  <p className="mt-2 min-h-11 text-sm leading-relaxed text-zinc-200">
                    {item.description || "Let’s connect."}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                    {ctaText}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
