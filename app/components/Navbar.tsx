'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'GitHub', href: '#github' },
  { name: 'Projects', href: '#projects' }, 
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-1200 mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/harsh_wardhan_resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-lg group-hover:shadow-[0_0_20px_rgba(87,240,255,0.5)] transition-shadow">
              HW
            </div>
            <span className="font-mono text-xl text-white">{"<Harsh Wardhan/>"}</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-gray-300 hover:text-neon-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href="/harsh_wardhan_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 hover:border-neon-blue/50 hover:shadow-[0_0_20px_rgba(87,240,255,0.3)] transition-all"
          >
            Resume
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
