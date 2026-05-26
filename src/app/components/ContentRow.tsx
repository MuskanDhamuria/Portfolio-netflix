import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface ContentItem {
  id: string;
  title: string;
  role?: string;
  thumbnail: string;
  description?: string;
  liveUrl?: string;
  cardVideoUrl?: string;
  redirectOnClick?: boolean;
}

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  onItemClick: (item: ContentItem) => void;
  cardWidthClassName?: string;
  cardAspectClassName?: string;
  centered?: boolean;
}

export function ContentRow({
  title,
  items,
  onItemClick,
  cardWidthClassName = "min-w-[200px] md:min-w-[280px]",
  cardAspectClassName = "aspect-[2/3]",
  centered = false,
}: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Safety check: if items is undefined or not an array, return null
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleItemClick = (item: ContentItem) => {
    if (item.redirectOnClick && item.liveUrl) {
      window.open(item.liveUrl, "_blank", "noopener,noreferrer");
      return;
    }
    onItemClick(item);
  };

  return (
    <div className="mb-8 md:mb-12 group">
      <h2 className="text-white px-8 md:px-16 lg:px-20 mb-4">{title}</h2>

      <div className="relative">
        {/* Left Arrow */}
        {!centered && showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        {/* Scrollable Content */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className={
            centered
              ? "flex flex-wrap justify-center gap-2 px-8 md:px-16 lg:px-20"
              : "flex gap-2 overflow-x-scroll scrollbar-hide px-8 md:px-16 lg:px-20 scroll-smooth"
          }
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id || `item-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${cardWidthClassName} cursor-pointer transition-transform relative`}
              onClick={() => handleItemClick(item)}
            >
              <div className={`relative ${cardAspectClassName} rounded overflow-hidden group/card`}>
                {item.cardVideoUrl ? (
                  <video
                    src={item.cardVideoUrl}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={item.thumbnail || "https://via.placeholder.com/400x600?text=No+Image"}
                    alt={item.title || "Content item"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/400x600?text=Image+Error";
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition-opacity group-hover/card:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium truncate">{item.title}</p>
                  {item.role && (
                    <p className="mt-0.5 text-[11px] text-gray-300 truncate">{item.role}</p>
                  )}
                  {centered && item.description && (
                    <p className="mt-2 text-xs text-gray-200 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover/card:opacity-100 group-hover/card:max-h-24 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        {!centered && showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
