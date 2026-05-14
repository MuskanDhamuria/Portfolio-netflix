import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface AwardItem {
  id: string;
  title: string;
  description?: string;
  organization?: string;
  date?: string;
  thumbnail?: string;
  githubUrl?: string;
}

interface AwardsSectionProps {
  items: AwardItem[];
}

export function AwardsSection({ items }: AwardsSectionProps) {
  const [activeAward, setActiveAward] = useState<AwardItem | null>(null);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  const Card = ({ item, index }: { item: AwardItem; index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      const node = cardRef.current;
      if (!node) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.25,
          rootMargin: "0px 0px -8% 0px",
        }
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    return (
      <button
        ref={cardRef}
        type="button"
        onClick={() => setActiveAward(item)}
        className={`award-card ${isVisible ? "award-card-visible" : ""}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
      <div className="award-title-wrap">
        <p className="award-title">{item.title}</p>
      </div>

      <img
        src={item.thumbnail || "https://via.placeholder.com/400x250?text=Award"}
        alt={item.title}
        className="award-image"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://via.placeholder.com/400x250?text=Image+Unavailable";
        }}
      />

      <div className="award-caption">
        {item.description && <p className="award-description">{item.description}</p>}
        {item.date && <p className="award-date">{item.date}</p>}
        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="award-github"
            onClick={(e) => e.stopPropagation()}
          >
            View on GitHub
          </a>
        )}
      </div>
      </button>
    );
  };

  return (
    <section className="mb-8 bg-black md:mb-12">
      <h2 className="mb-4 px-8 text-white md:px-16 lg:px-20">Awards</h2>

      <div className="award-grid px-8 md:px-16 lg:px-20">
        {items.map((item, index) => (
          <Card key={`${item.id}-award-${index}`} item={item} index={index} />
        ))}
      </div>

      <style>{`
        .award-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 240px));
          gap: 22px;
          justify-content: center;
        }

        .award-card {
          width: 240px;
          min-height: 345px;
          height: auto;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015)),
            #121216;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.35),
            0 1px 0 rgba(255, 255, 255, 0.03) inset;
          text-align: left;
          overflow: hidden;
          border-radius: 14px;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          opacity: 0;
          transform: translateY(18px) scale(0.96);
          transition: opacity 420ms ease, transform 420ms ease, border-color 0.12s ease-out;
          display: flex;
          flex-direction: column;
        }

        .award-card:hover {
          transform: translateY(-4px) scale(1.015);
          border-color: rgba(255, 255, 255, 0.26);
          box-shadow:
            0 18px 36px rgba(0, 0, 0, 0.42),
            0 1px 0 rgba(255, 255, 255, 0.05) inset;
        }

        .award-card-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .award-title-wrap {
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.09);
          min-height: 58px;
          display: flex;
          align-items: center;
        }

        .award-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: 0.01em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .award-image {
          width: 100%;
          height: 160px;
          object-fit: cover;
          background: #27272a;
        }

        .award-caption {
          padding: 12px 14px 14px;
          margin-top: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .award-description {
          color: #e4e4e7;
          font-size: 12px;
          line-height: 1.45;
          white-space: normal;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .award-date {
          color: #fca5a5;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .award-github {
          display: inline-block;
          width: fit-content;
          margin-top: auto;
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          padding: 6px 10px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.24);
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .award-github:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.32);
          transform: translateY(-1px);
        }

      `}</style>

      {activeAward && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActiveAward(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-white/20 bg-zinc-950"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveAward(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white transition hover:bg-black"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-red-300/80">
                {activeAward.organization || "Award"} {activeAward.date ? `| ${activeAward.date}` : ""}
              </p>
              <h3 className="mt-2 text-xl text-white md:text-2xl">{activeAward.title}</h3>
              {activeAward.description && (
                <p className="mt-3 text-sm text-white/75 md:text-base">{activeAward.description}</p>
              )}
              {activeAward.githubUrl && (
                <a
                  href={activeAward.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm text-white transition hover:bg-white/20"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
