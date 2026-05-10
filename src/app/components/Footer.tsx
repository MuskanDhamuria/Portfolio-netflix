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
            href="https://linkedin.com/in/muskandhamuria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/muskandhamuria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="mailto:muskan.dhamuria@example.com"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
          <div>
            <p className="text-gray-400 hover:underline cursor-pointer">About Me</p>
          </div>
          <div>
            <p className="text-gray-400 hover:underline cursor-pointer">Contact</p>
          </div>
          <div>
            <p className="text-gray-400 hover:underline cursor-pointer">Resume</p>
          </div>
          <div>
            <p className="text-gray-400 hover:underline cursor-pointer">Privacy</p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © 2026 Muskan Dhamuria. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
