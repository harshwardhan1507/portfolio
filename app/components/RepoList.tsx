'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
  CSS: '#563d7c',
  HTML: '#e34c26',
};

function RepoCard({ repo, index }: { repo: Repository; index: number }) {
  const date = new Date(repo.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card glass-card-hover p-6 block group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-neon-blue transition-colors">
          {repo.name}
        </h3>
        {repo.stargazers_count > 0 && (
          <div className="flex items-center gap-1 text-gray-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0l-2.244 6.958L1.295 10.245a1.053 1.053 0 00-.632 1.265l2.582 8.097-1.633 6.912a1.052 1.052 0 001.492 1.31l7.184-2.582 7.185 2.582a1.052 1.052 0 001.492-1.31l-1.633-6.912 2.582-8.097a1.053 1.053 0 00-.632-1.265l-8.755-3.245L12 0z"/>
            </svg>
            <span className="text-sm">{repo.stargazers_count}</span>
          </div>
        )}
      </div>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {repo.description || 'No description available'}
      </p>
      
      <div className="flex items-center gap-4">
        {repo.language && (
          <div className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: languageColors[repo.language] || '#8b949e' }}
            ></span>
            <span className="text-sm text-gray-400">{repo.language}</span>
          </div>
        )}
        <span className="text-sm text-gray-500">{date}</span>
      </div>
    </motion.a>
  );
}

export default function RepoList() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const username = 'harshwardhan1507';

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  return (
    <section className="py-20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-screen-1200 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Recent Repositories</h2>
          <p className="text-gray-400">Latest projects from GitHub</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
