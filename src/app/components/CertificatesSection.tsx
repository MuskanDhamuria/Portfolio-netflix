import { useState } from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface CertificateItem {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  organization?: string;
  date?: string;
  url?: string;
  details?: {
    skills?: string[];
  };
}

interface CertificatesSectionProps {
  items: CertificateItem[];
  onItemClick: (item: CertificateItem) => void;
}

export function CertificatesSection({ items, onItemClick }: CertificatesSectionProps) {
  const [featuredId, setFeaturedId] = useState(items[0]?.id);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  const featured = items.find((item) => item.id === featuredId) || items[0];

  return (
    <section className="mb-8 px-8 md:mb-12 md:px-16 lg:px-20">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-white">Certificates</h2>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.button
          type="button"
          onClick={() => onItemClick(featured)}
          whileHover={{ scale: 1.008 }}
          className="group relative overflow-hidden rounded-xl border border-white/15 bg-zinc-950 text-left shadow-[0_18px_50px_rgba(0,0,0,0.55)] lg:col-span-2"
        >
          <img
            src={featured.thumbnail || "https://via.placeholder.com/1200x700?text=Certificate"}
            alt={featured.title}
            className="h-[300px] w-full object-cover saturate-110 transition duration-700 group-hover:scale-110 md:h-[380px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute left-0 right-0 top-0 p-4">
            
          </div>
          <div className="absolute left-0 right-0 bottom-0 p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-red-200/95">
              {featured.organization || "Certificate"} {featured.date ? `| ${featured.date}` : ""}
            </p>
            <h3 className="mt-2 text-2xl text-white md:text-3xl">{featured.title}</h3>
            {featured.description && (
              <p className="mt-2 line-clamp-3 max-w-2xl text-sm leading-relaxed text-white/80">{featured.description}</p>
            )}
            {featured.url && (
              <a
                href={featured.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white transition hover:bg-white/20"
              >
                Verify Certificate
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </motion.button>

        <div className="max-h-[380px] space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-zinc-950/90 p-3 md:max-h-[440px]">
          {items.map((item) => {
            const isActive = item.id === featured.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFeaturedId(item.id)}
                className={`w-full rounded-lg border px-2.5 py-2.5 text-left transition ${
                  isActive
                    ? "border-red-400/55 bg-red-500/12"
                    : "border-white/10 bg-zinc-900/70 hover:border-red-300/35 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.thumbnail || "https://via.placeholder.com/120x80?text=Cert"}
                    alt={item.title}
                    className="h-14 w-20 rounded-md object-cover"
                  />
                  <div className="min-w-0">
                    <p className={`text-xs uppercase tracking-[0.2em] ${isActive ? "text-red-200/95" : "text-white/55"}`}>
                      {item.date || "Credential"}
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm text-white">{item.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-white/60">{item.organization}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
