import React from "react";
import { Mail, Github, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-100 to-yellow-100 text-gray-800 py-6 mt-0 shadow-inner">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-lg font-semibold">
          Designed & Developed by{" "}
          <span className="text-pink-600 font-bold">Shubham Asawale</span>
        </p>

        <p className="text-sm text-gray-600">
          Built with <span className="text-pink-500 font-medium">React.js</span>,{" "}
          <span className="text-green-600 font-medium">MongoDB</span> {" "},
          <span className="text-blue-500 font-medium">Tailwind CSS </span>and{" "}
          <span className="text-green-600 font-medium">ExpressJs</span>

        </p>

        <div className="flex justify-center items-center space-x-6">
          <a
            href="https://wa.me/7887764390"
            className="hover:text-pink-600 transition"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone />
          </a>
          <a
            href="mailto:shubhamasawale9@gmail.com"
            className="hover:text-pink-600 transition"
            aria-label="Gmail"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail />
          </a>
          <a
            href="https://github.com/shubham03062002"
            className="hover:text-pink-600 transition"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
          <a
            href="https://shubham-portfolio-pied.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="about"
          >
            <Github />
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          © {new Date().getFullYear()} ChillScreen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
