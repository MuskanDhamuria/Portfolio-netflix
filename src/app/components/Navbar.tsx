import { motion } from "motion/react";
import { Search, Bell } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);
  const notifications = [
    { id: "n1", title: "Hiiii!!", subtitle: "Welcome to my portfolio :p", gif: "gif/dog.gif" },
  ];
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Awards", href: "#awards" },
    { label: "Certificates", href: "#certificates" },
    { label: "Connect", href: "#connect" },
  ];
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return navItems;
    }
    return navItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setScrolled(window.scrollY > 50);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };
    const onMouseDown = (event: MouseEvent) => {
      if (!searchRef.current) return;
      if (!searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  const jumpToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSearchOpen(false);
    setNotificationsOpen(false);
    setQuery("");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-8 md:px-16 lg:px-20 py-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 tracking-tight">MD</h1>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors ${
                  index === 0
                    ? "text-white hover:text-gray-300"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4" ref={searchRef}>
          <button
            type="button"
            aria-label="Open search"
            onClick={() => {
              setSearchOpen((prev) => !prev);
              setNotificationsOpen(false);
            }}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          {searchOpen && (
            <div className="absolute right-20 top-14 w-[280px] rounded-lg border border-white/15 bg-black/95 p-2 shadow-2xl backdrop-blur">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections..."
                className="w-full rounded-md border border-white/15 bg-zinc-900 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-400 focus:border-red-500/60"
              />
              <div className="mt-2 max-h-56 overflow-y-auto">
                {searchResults.length === 0 ? (
                  <p className="px-2 py-2 text-xs text-zinc-400">No matching sections.</p>
                ) : (
                  searchResults.map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => jumpToSection(item.href)}
                      className="block w-full rounded-md px-2 py-2 text-left text-sm text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
                    >
                      {item.label}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
          <button
            type="button"
            aria-label="Open notifications"
            onClick={() => {
              setNotificationsOpen((prev) => !prev);
              setSearchOpen(false);
            }}
            className="relative text-white hover:text-gray-300 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>
          {notificationsOpen && (
            <div className="absolute right-10 top-14 w-[320px] rounded-lg border border-white/15 bg-black/95 p-2 shadow-2xl backdrop-blur">
              <p className="px-2 pb-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Notifications</p>
              <div className="max-h-72 space-y-2 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-md border border-white/10 bg-zinc-900/70 p-2">
                    <img
                      src={item.gif}
                      alt={item.title}
                      className="h-14 w-14 rounded-md object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/56x56?text=GIF";
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-white">{item.title}</p>
                      <p className="truncate text-xs text-zinc-400">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => jumpToSection("#projects")}
                  className="rounded-md border border-white/15 bg-zinc-900 px-2 py-1 text-xs text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
                >
                  Go to Projects
                </button>
                <button
                  type="button"
                  onClick={() => jumpToSection("#connect")}
                  className="rounded-md border border-white/15 bg-zinc-900 px-2 py-1 text-xs text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
                >
                  Go to Connect
                </button>
              </div> */}
            </div>
          )}
          <div className="w-8 h-8 bg-red-600 rounded overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white text-sm">
              M
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
