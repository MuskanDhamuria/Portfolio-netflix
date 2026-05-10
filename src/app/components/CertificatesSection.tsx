import { useMemo, useState } from "react";
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
  const skillTape = useMemo(
    () =>
      items
        .flatMap((item) => item.details?.skills || [])
        .filter((skill, index, arr) => arr.indexOf(skill) === index)
        .slice(0, 14),
    [items]
  );

  return (
    <section className="mb-8 px-8 md:mb-12 md:px-16 lg:px-20">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-white">Certificates</h2>
          <p className="mt-1 text-sm text-white/55">Credential vault with verified learning tracks</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.button
          type="button"
          onClick={() => onItemClick(featured)}
          whileHover={{ scale: 1.01 }}
          className="group relative overflow-hidden rounded-xl border border-white/15 bg-zinc-900 text-left lg:col-span-2"
        >
          <img
            src={featured.thumbnail || "https://via.placeholder.com/1200x700?text=Certificate"}
            alt={featured.title}
            className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[360px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
          <div className="absolute left-0 right-0 top-0 p-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1 text-xs text-emerald-100">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Credential
            </div>
          </div>
          <div className="absolute left-0 right-0 bottom-0 p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">
              {featured.organization || "Certificate"} {featured.date ? `| ${featured.date}` : ""}
            </p>
            <h3 className="mt-2 text-xl text-white md:text-2xl">{featured.title}</h3>
            {featured.description && <p className="mt-2 max-w-2xl text-sm text-white/75">{featured.description}</p>}
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

        <div className="max-h-[360px] space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-zinc-950/80 p-3 md:max-h-[420px]">
          {items.map((item) => {
            const isActive = item.id === featured.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFeaturedId(item.id)}
                className={`w-full rounded-lg border px-3 py-3 text-left transition ${
                  isActive
                    ? "border-cyan-300/40 bg-cyan-400/10"
                    : "border-white/10 bg-zinc-900/70 hover:border-white/25 hover:bg-zinc-900"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/55">{item.date || "Credential"}</p>
                <p className="mt-1 text-sm text-white">{item.title}</p>
                <p className="mt-1 text-xs text-white/60">{item.organization}</p>
              </button>
            );
          })}
        </div>
      </div>

      {skillTape.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-zinc-950/70 py-2">
          <div className="flex w-max gap-2 px-3 animate-[marqueeSkills_26s_linear_infinite]">
            {[...skillTape, ...skillTape].map((skill, idx) => (
              <span key={`${skill}-${idx}`} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes marqueeSkills {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

