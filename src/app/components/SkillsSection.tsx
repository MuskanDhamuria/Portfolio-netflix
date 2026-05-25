import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Code, Layout, BarChart, Shield, Wrench, Globe } from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
  thumbnail: string;
}

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const iconMap: { [key: string]: any } = {
  Code,
  Layout,
  BarChart,
  Shield,
  Wrench,
  Globe,
};

export function SkillsSection({ categories }: SkillsSectionProps) {
  if (!categories || categories.length === 0) {
    return null;
  }
  const scanStartMs = 3200;
  const rowStepMs = 500;
  const analysisDoneMs = scanStartMs + rowStepMs * 3.4+ 300;
  const skillsRevealDelayMs = 250;
  const terminalExitMs = analysisDoneMs + skillsRevealDelayMs;
  const [sectionStarted, setSectionStarted] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showScanText, setShowScanText] = useState(false);
  const [filledRows, setFilledRows] = useState(0);
  const [showDoneText, setShowDoneText] = useState(false);

  useEffect(() => {
    if (!sectionStarted) {
      return;
    }
    const scanTimer = setTimeout(() => setShowScanText(true), scanStartMs);
    const rowsTimer = setInterval(() => {
      setFilledRows((prev) => {
        const next = prev + 1;
        if (next >= barRows.length) {
          clearInterval(rowsTimer);
          setShowDoneText(true);
          return barRows.length;
        }
        return next;
      });
    }, rowStepMs);
    const hideTimer = setTimeout(() => setShowTerminal(false), terminalExitMs);

    return () => {
      clearTimeout(scanTimer);
      clearInterval(rowsTimer);
      clearTimeout(hideTimer);
    };
  }, [sectionStarted]);

  const barRows = [
    { label: "Frontend", blocks: "\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591", key: "frontend" },
    { label: "Backend", blocks: "\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591", key: "backend" },
    { label: "Cybersecurity", blocks:  "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588", key: "cybersecurity" },
  ];

  const skillsByRow = (rowKey: string) => {
    const found = categories.find((c) => c.title.toLowerCase() === rowKey);
    return found?.skills || [];
  };

  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-white px-8 md:px-16 lg:px-20 mb-8">My Skills</h2>

      <div className="px-8 md:px-16 lg:px-20">
        <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          whileInView={{ opacity: showTerminal ? 1 : 0, y: showTerminal ? 0 : -20, scale: 1 }}
          animate={{ opacity: showTerminal ? 1 : 0, y: showTerminal ? 0 : -20 }}
          viewport={{ once: true, amount: 0.45 }}
          onViewportEnter={() => {
            if (!sectionStarted) {
              setSectionStarted(true);
            }
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-0 top-0 z-20"
          style={{ pointerEvents: showTerminal ? "auto" : "none" }}
        >
          <div className="skill-terminal-card">
            <div className="skill-terminal-wrap">
              <div className="skill-terminal">
                <div className="skill-terminal-head">
                  <p className="skill-terminal-title">
                    <svg
                      width="16"
                      height="16"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                    >
                      <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
                    </svg>
                    Terminal
                  </p>
                  <button className="skill-copy-toggle" tabIndex={-1} type="button">
                    <svg
                      width="16"
                      height="16"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                    >
                      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                      <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                    </svg>
                  </button>
                </div>
                <div className="skill-terminal-body">
                  <pre className="skill-terminal-pre">
                    <code>-&nbsp;</code>
                    <code>npx&nbsp;</code>
                    <code className="skill-cmd" data-cmd="muskan skills" />
                  </pre>
                  {/* {showScanText && (
                    // <p className="skill-line mt-3">Scanning developer profile...</p>
                  )} */}
                  <div className="mt-3 flex flex-col gap-2">
                    {barRows.map((row, idx) => (
                      <div key={row.label} className="skill-bar-group">
                        <div className="skill-line">
                          [{filledRows > idx ? row.blocks : "\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591"}] {row.label}
                        </div>
                        <div className="skill-popover">
                          {skillsByRow(row.key).map((skill) => (
                            <span key={`${row.key}-${skill}`} className="skill-chip">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {showDoneText && <p className="skill-line mt-3">Analysis complete.</p>}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showTerminal ? 0 : 1, y: showTerminal ? 20 : 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-10"
          style={{ pointerEvents: showTerminal ? "none" : "auto" }}
        >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Code;

            return (
              <motion.div
                key={category.id}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.9,
                }}
                animate={{
                  opacity: showTerminal ? 0 : 1,
                  y: showTerminal ? 20 : 0,
                  scale: 1,
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{
                  delay: showTerminal ? 0 : index * 0.12,
                  duration: 0.35,
                }}
                className="skill-category-card group"
              >
                <div className="skill-card-inner h-full">
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80">
                        <IconComponent className="w-5 h-5 text-red-500 skill-card-icon" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="skill-card-title text-white text-xl">{category.title}</h3>
                    </div>

                    <div className="skill-skills-wrap mt-auto">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={`${category.id}-skill-${skillIndex}`}
                        className="skill-skill-chip"
                      >
                        {skill}
                      </span>
                    ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        </motion.div>
        </div>
      </div>
      <style>{`
        .skill-terminal-card {
          padding: 0.1rem;
          overflow: hidden;
          border-radius: 12px;
          background-color: #d9d9d92f;
          backdrop-filter: blur(8px);
        }
        .skill-terminal-wrap {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          z-index: 10;
          border-radius: 8px;
          overflow: hidden;
        }
        .skill-terminal {
          display: flex;
          flex-direction: column;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
        .skill-terminal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 40px;
          padding-inline: 12px;
          background-color: #202425;
        }
        .skill-terminal-title {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 2.5rem;
          font-weight: 600;
          color: #8e8e8e;
        }
        .skill-terminal-title > svg {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          color: #006adc;
        }
        .skill-copy-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border: 0.65px solid #c1c2c5;
          border-radius: 6px;
          background-color: #202425;
          color: #8e8e8e;
          cursor: pointer;
        }
        .skill-copy-toggle > svg {
          width: 20px;
          height: 20px;
        }
        .skill-terminal-body {
          overflow-x: auto;
          padding: 1rem;
          line-height: 19px;
          color: white;
          background-color: black;
          min-height: 240px;
        }
        .skill-terminal-pre {
          display: flex;
          align-items: center;
          white-space: pre;
          font-size: 16px;
        }
        .skill-terminal-pre code:nth-child(1) {
          color: #575757;
        }
        .skill-terminal-pre code:nth-child(2) {
          color: #e34ba9;
        }
        .skill-cmd {
          height: 19px;
          position: relative;
          display: flex;
          align-items: center;
        }
        .skill-cmd::before {
          content: attr(data-cmd);
          display: block;
          white-space: nowrap;
          overflow: hidden;
          animation: skill-inputs 3s steps(22) 1 forwards;
        }
        .skill-cmd::after {
          content: "";
          display: block;
          height: 100%;
          border-right: 0.15em solid #e34ba9;
          animation: skill-cursor 0.5s step-end infinite alternate, skill-blinking 0.5s infinite;
        }
        @keyframes skill-blinking {
          20%, 80% { transform: scaleY(1); }
          50% { transform: scaleY(0); }
        }
        @keyframes skill-cursor {
          50% { border-right-color: transparent; }
        }
        @keyframes skill-inputs {
          0% { width: 0; }
          20% { width: 58px; }
          100% { width: 215px; max-width: max-content; }
        }
        .skill-line {
          color: #d1d5db;
          white-space: pre-wrap;
          font-size: 14px;
        }
        .skill-bar-group {
          position: relative;
          width: fit-content;
        }
        .skill-popover {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          display: none;
          gap: 6px;
          flex-wrap: wrap;
          max-width: 320px;
          background: rgba(24, 24, 27, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 8px;
          z-index: 20;
        }
        .skill-bar-group:hover .skill-popover {
          display: flex;
        }
        .skill-chip {
          background: #27272a;
          color: #e5e7eb;
          border-radius: 9999px;
          padding: 3px 8px;
          font-size: 11px;
          line-height: 1.2;
        }
        .skill-category-card {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }
        .skill-card-inner {
          position: relative;
          z-index: 0;
          background: #0b0c13;
          border: 1px solid #27272a;
          border-radius: 8px;
          padding: 24px;
          overflow: hidden;
          min-height: 280px;
          transition: background-color 0.55s ease, border-color 0.55s ease;
        }
        .skill-card-inner::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: -16px;
          right: -16px;
          height: 32px;
          width: 32px;
          border-radius: 9999px;
          background: #dc2626;
          transform: scale(1);
          transform-origin: 50% 50%;
          transition: transform 0.35s ease-out;
        }
        .skill-category-card:hover .skill-card-inner::before {
          transform: scale(30);
        }
        .skill-category-card:hover .skill-card-inner {
          background: #dc2626;
          border-color: #dc2626;
        }
        .skill-skills-wrap {
          display: flex;
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 24px;
          flex-wrap: wrap;
          gap: 8px;
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .skill-skill-chip {
          padding: 6px 10px;
          border-radius: 9999px;
          font-size: 12px;
          line-height: 1.2;
          background: rgba(39, 39, 42, 0.9);
          color: #d4d4d8;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .skill-category-card:hover .skill-skills-wrap {
          opacity: 1;
          transform: translateY(0);
        }
        .skill-category-card:hover .skill-card-title,
        .skill-category-card:hover .skill-card-icon {
          color: #fff;
        }
        .skill-category-card:hover .skill-skill-chip {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.25);
          color: #fff;
        }
      `}</style>
    </div>
  );
}
