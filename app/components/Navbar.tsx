'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'GitHub', href: '#github' },
  { name: 'Projects', href: '#projects' }, 
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="max-w-screen-1200 mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/harsh_wardhan_resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-red to-neon-orange flex items-center justify-center text-white font-bold text-lg group-hover:shadow-[0_0_20px_rgba(255,16,42,0.5)] transition-shadow">
              HW
            </div>
            <span className="font-mono text-base sm:text-xl text-white truncate">{"<Harsh Wardhan/>"}</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-gray-300 hover:text-neon-red transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <a
            href="/harsh_wardhan_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-5 py-2 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 hover:border-neon-red/50 hover:shadow-[0_0_20px_rgba(255,16,42,0.3)] transition-all"
          >
            Resume
          </a>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 glass-card p-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-neon-red transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/harsh_wardhan_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full justify-center px-4 py-2 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-all"
            >
              Resume
            </a>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
