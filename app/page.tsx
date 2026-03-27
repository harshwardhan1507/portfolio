/**
 * ========================================
 * PORTFOLIO MAIN PAGE
 * ========================================
 * This is the main landing page component that renders
 * all portfolio sections. The animated particles background
 * is provided by the Particles component in layout.tsx.
 * ========================================
 */

'use client';

import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';           // ← added
import Achievements from './components/Achievements';
import GitHubStats from './components/GitHubStats';
import RepoList from './components/RepoList';
import ContributionGraph from './components/ContributionGraph';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top"
      aria-label="Back to top"
    >
      <svg className="w-6 h-6 text-neon-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />              {/* ← added */}
      <Achievements />
      <GitHubStats />
      <RepoList />
      <ContributionGraph />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}