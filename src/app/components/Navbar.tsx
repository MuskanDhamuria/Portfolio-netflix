import { motion } from "motion/react";
import { Search, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-gray-300 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-gray-300 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
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
