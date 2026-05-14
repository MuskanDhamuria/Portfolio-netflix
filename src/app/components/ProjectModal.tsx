import { motion, AnimatePresence } from "motion/react";
import { X, Play, ExternalLink, Github } from "lucide-react";
import { useEffect } from "react";

interface ProjectDetails {
  tech?: string[];
  duration?: string;
  role?: string;
  highlights?: string[];
  achievements?: string[];
  courses?: string[];
  description?: string;
  impact?: string[];
  skills?: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  trailerUrl?: string;
  recommendationletter?: string;
  details?: ProjectDetails;
  liveUrl?: string;
  githubUrl?: string;
  readTime?: string;
  date?: string;
  url?: string;
  icon?: string;
  company?: string;
  companyUrl?: string;
  organization?: string;
  institution?: string;
  degree?: string;
  period?: string;
  credentialId?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const isImageMedia = (url?: string) => {
    if (!url) return false;
    const cleanUrl = url.split("?")[0].split("#")[0].toLowerCase();
    return /\.(jpg|jpeg|png|gif|webp|avif|svg)$/.test(cleanUrl);
  };

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-zinc-900 rounded-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Video/Thumbnail */}
            <div className="relative w-full aspect-video bg-black">
              {project.trailerUrl ? (
                isImageMedia(project.trailerUrl) ? (
                  <img
                    src={project.trailerUrl}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={project.trailerUrl} />
                  </video>
                )
              ) : (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h2 className="text-white mb-2">{project.title}</h2>
              {project.company && (
                <p className="text-red-600 mb-2">{project.company}</p>
              )}
              {project.organization && (
                <p className="text-red-600 mb-2">{project.organization}</p>
              )}
              {project.institution && (
                <p className="text-red-600 mb-2">{project.institution}</p>
              )}
              {project.degree && (
                <p className="text-gray-400 mb-2">{project.degree}</p>
              )}
              {project.period && (
                <p className="text-gray-400 text-sm mb-4">{project.period}</p>
              )}
              {project.credentialId && (
                <p className="text-gray-500 text-sm mb-4">
                  Credential ID: {project.credentialId}
                </p>
              )}
              <p className="text-gray-300 mb-6">{project.description}</p>

              {/* Project Details */}
              {project.details && (
                <div className="space-y-4 mb-6">
                  {project.details.tech && project.details.tech.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.details.tech.map((tech, index) => (
                          <span
                            key={`tech-${index}-${tech}`}
                            className="px-3 py-1 bg-zinc-800 text-white text-sm rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(project.details.duration || project.details.role) && (
                    <div className="grid grid-cols-2 gap-4">
                      {project.details.duration && (
                        <div>
                          <p className="text-gray-400 text-sm">Duration</p>
                          <p className="text-white">{project.details.duration}</p>
                        </div>
                      )}
                      {project.details.role && (
                        <div>
                          <p className="text-gray-400 text-sm">Role</p>
                          <p className="text-white">{project.details.role}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {project.details.highlights && project.details.highlights.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Highlights</p>
                      <ul className="space-y-2">
                        {project.details.highlights.map((highlight, index) => (
                          <li key={`highlight-${index}`} className="text-gray-300 flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.details.achievements && project.details.achievements.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Achievements</p>
                      <ul className="space-y-2">
                        {project.details.achievements.map((achievement, index) => (
                          <li key={`achievement-${index}`} className="text-gray-300 flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.details.courses && project.details.courses.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Key Courses</p>
                      <div className="flex flex-wrap gap-2">
                        {project.details.courses.map((course, index) => (
                          <span
                            key={`course-${index}-${course}`}
                            className="px-3 py-1 bg-zinc-800 text-white text-sm rounded"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.details.impact && project.details.impact.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Impact</p>
                      <ul className="space-y-2">
                        {project.details.impact.map((item, index) => (
                          <li key={`impact-${index}`} className="text-gray-300 flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.details.skills && project.details.skills.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Skills Covered</p>
                      <div className="flex flex-wrap gap-2">
                        {project.details.skills.map((skill, index) => (
                          <span
                            key={`skill-${index}-${skill}`}
                            className="px-3 py-1 bg-zinc-800 text-white text-sm rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Blog Details */}
              {project.readTime && (
                <div className="space-y-2 mb-6">
                  <p className="text-gray-400 text-sm">
                    {project.readTime} • Published on {project.date}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.recommendationletter && (
                  <a
                    href={project.recommendationletter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded hover:bg-zinc-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Recommendation Letter</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded hover:bg-white/90 transition-colors"
                  >
                    <Play className="w-4 h-4" fill="currentColor" />
                    <span>View Live</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded hover:bg-zinc-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {project.companyUrl && (
                  <a
                    href={project.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded hover:bg-zinc-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visit Company</span>
                  </a>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded hover:bg-zinc-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Learn More</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
