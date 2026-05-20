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

const colorClasses = [
  "bg-gradient-to-br from-zinc-500/30 to-zinc-900/40",
  "bg-gradient-to-br from-sky-800/30 to-blue-900/40",
  "bg-gradient-to-br from-rose-800/30 to-orange-900/40",
];

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

        <div className="cards group flex flex-wrap items-stretch justify-center gap-4">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon || ""] || Mail;
            const ctaText = item.title.toLowerCase() === "email" ? "Send message" : `Visit ${item.title}`;
            const color = colorClasses[index % colorClasses.length];

            return (
              <a
                key={item.id}
                href={item.url}
                target={item.url.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className={`card relative flex h-[190px] w-[190px] cursor-pointer flex-col rounded-xl border border-white/10 bg-zinc-900/55 p-4 text-white transition duration-400 ${color}`}
              >
                <div className="flex h-full flex-col">
                  <div className="mb-3 inline-flex w-fit rounded-lg border border-white/20 bg-black/20 p-2">
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="tip text-lg font-bold">{item.title}</h3>
                  <p className="second-text mt-1 text-xs leading-relaxed text-white/90">
                    {item.description || "Let's connect."}
                  </p>
                  
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .cards .card:hover {
          transform: scale(1.2);
          z-index: 2;
        }

        .cards:hover > .card:not(:hover) {
          filter: blur(10px);
          transform: scale(0.9);
        }
      `}</style>
    </section>
  );
}
