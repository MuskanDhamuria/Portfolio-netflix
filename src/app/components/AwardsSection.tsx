import { useMemo, useState } from "react";
import { X } from "lucide-react";

interface AwardItem {
  id: string;
  title: string;
  description?: string;
  organization?: string;
  date?: string;
}

interface AwardsSectionProps {
  items: AwardItem[];
}

export function AwardsSection({ items }: AwardsSectionProps) {
  const [activeAward, setActiveAward] = useState<AwardItem | null>(null);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  const topRow = items.filter((_, idx) => idx % 2 === 0);
  const bottomRow = items.filter((_, idx) => idx % 2 === 1);

  const loopTop = useMemo(() => [...topRow, ...topRow, ...topRow], [topRow]);
  const loopBottom = useMemo(() => [...bottomRow, ...bottomRow, ...bottomRow], [bottomRow]);

  const Card = ({ item }: { item: AwardItem }) => (
    <button
      type="button"
      onClick={() => setActiveAward(item)}
      className="relative min-w-[240px] md:min-w-[320px] aspect-video overflow-hidden rounded-md border border-white/10 bg-zinc-900 text-left transition-transform hover:scale-[1.03]"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-zinc-800/40" />
      <div className="absolute left-0 right-0 bottom-0 p-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-red-300/90">
          {item.organization || "Recognition"} {item.date ? `| ${item.date}` : ""}
        </p>
        <p className="mt-1 text-sm text-white md:text-base">{item.title}</p>
      </div>
    </button>
  );

  return (
    <section className="mb-8 bg-black md:mb-12">
      <h2 className="mb-4 px-8 text-white md:px-16 lg:px-20">Awards</h2>

      <div className="space-y-3 overflow-hidden px-8 md:px-16 lg:px-20">
        <div className="overflow-hidden">
          <div className="flex w-max gap-3 animate-[marqueeLeftThird_35s_linear_infinite] hover:[animation-play-state:paused]">
            {loopTop.map((item, index) => (
              <Card key={`${item.id}-top-${index}`} item={item} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex w-max gap-3 animate-[marqueeRightThird_38s_linear_infinite] hover:[animation-play-state:paused]">
            {loopBottom.map((item, index) => (
              <Card key={`${item.id}-bottom-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeftThird {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marqueeRightThird {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
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
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
