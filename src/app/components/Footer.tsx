import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-8 md:px-16 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Social Links */}
        <div className="flex gap-6 mb-8">
          <a
            href="https://github.com/muskandhamuria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/muskan-d-2a81a2331/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
      
          <a
            href="mailto:muskandhamuria3k@gmail.com"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

      

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          2026 Muskan Dhamuria.
        </p>
      </div>
    </footer>
  );
}
