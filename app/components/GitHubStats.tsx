'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GitHubUser {
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  delay: number;
}

function StatCard({ icon, value, label, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card glass-card-hover p-6 text-center"
    >
      <div className="flex justify-center mb-4 text-neon-red">{icon}</div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <span className="w-2 h-2 rounded-full bg-neon-green"></span>
        {label}
      </div>
    </motion.div>
  );
}

export default function GitHubStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const username = 'harshwardhan1507';

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  const stats = [
    { key: 'repos', label: 'Public Repos', value: user?.public_repos ?? '--' },
    { key: 'stars', label: 'Total Stars', value: '--' },
    { key: 'forks', label: 'Total Forks', value: '--' },
    { key: 'followers', label: 'Followers', value: user?.followers ?? '--' },
    { key: 'following', label: 'Following', value: user?.following ?? '--' },
    { key: 'gists', label: 'Public Gists', value: user?.public_gists ?? '--' },
  ];

  const icons = [
    <svg key="1" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
    <svg key="2" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l-2.244 6.958L1.295 10.245a1.053 1.053 0 00-.632 1.265l2.582 8.097-1.633 6.912a1.052 1.052 0 001.492 1.31l7.184-2.582 7.185 2.582a1.052 1.052 0 001.492-1.31l-1.633-6.912 2.582-8.097a1.053 1.053 0 00-.632-1.265l-8.755-3.245L12 0zm0 4.651l1.523 4.708-4.17 2.99 4.17 2.99-1.523 4.708-4.17-2.99-4.17 2.99 1.523-4.708-4.17-2.99 4.17-2.99L12 4.651z"/></svg>,
    <svg key="3" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 7V3l5 4-5 4zm-5 4a2 2 0 110-4 2 2 0 010 4zm5-9h5v2h-5V4z"/></svg>,
    <svg key="4" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
    <svg key="5" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
    <svg key="6" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 7V3l5 4-5 4zm-5 4a2 2 0 110-4 2 2 0 010 4zm5-9h5v2h-5V4z"/></svg>,
  ];

  return (
    <section id="github" className="py-20 relative bg-black/50 backdrop-blur-sm">
      <div className="max-w-screen-1200 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">{"<GitHub/>"}</span>
          </h2>
          <p className="text-xl text-gray-400">Real-time GitHub metrics & activity logs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.key}
              icon={icons[index]}
              value={loading ? '...' : stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
