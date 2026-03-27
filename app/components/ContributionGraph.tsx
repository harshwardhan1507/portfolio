'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface GitHubEvent {
  created_at: string;
  type: string;
}

const username = 'harshwardhan1507';

export default function ContributionGraph() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);

  useEffect(() => {
    if (!chartRef.current) return;

    // Fetch user's public events to calculate contributions
    fetch(`https://api.github.com/users/${username}/events?per_page=100`)
      .then((res) => res.json())
      .then((events: GitHubEvent[]) => {
        // Calculate contributions from the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentEvents = events.filter((event) => {
          const eventDate = new Date(event.created_at);
          return eventDate >= thirtyDaysAgo;
        });

        // Group events by date
        const eventsByDate: Record<string, number> = {};
        recentEvents.forEach((event) => {
          const date = new Date(event.created_at).toISOString().split('T')[0];
          eventsByDate[date] = (eventsByDate[date] || 0) + 1;
        });

        // Generate labels for last 30 days
        const labels = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        // Map events to data (default to 0 if no events)
        const data = labels.map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          const dateStr = date.toISOString().split('T')[0];
          return eventsByDate[dateStr] || 0;
        });

        setTotalContributions(recentEvents.length);

        // Calculate current streak
        let streak = 0;
        for (let i = 29; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          if (eventsByDate[dateStr]) {
            streak++;
          } else if (i < 29) {
            break;
          }
        }
        setCurrentStreak(streak);

        // Calculate longest streak
        let maxStreak = 0;
        let currentRun = 0;
        Object.keys(eventsByDate).sort().forEach((date) => {
          const prevDate = new Date(currentRun > 0 ? Object.keys(eventsByDate).sort()[Object.keys(eventsByDate).sort().indexOf(date) - 1] : date);
          const thisDate = new Date(date);
          const diffDays = Math.floor((thisDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays <= 1 && currentRun > 0) {
            currentRun++;
          } else {
            currentRun = 1;
          }
          maxStreak = Math.max(maxStreak, currentRun);
        });
        setLongestStreak(maxStreak || streak);

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(chartRef.current, {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'Contributions',
              data,
              borderColor: '#ff102a',
              backgroundColor: 'rgba(255, 16, 42, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#ff102a',
              pointBorderColor: '#ff102a',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#ff102a',
              pointRadius: 4,
              pointHoverRadius: 6,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#94a3b8',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
              }
            },
            scales: {
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                  color: '#64748b',
                  maxRotation: 45,
                  minRotation: 45,
                }
              },
              y: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                  color: '#64748b',
                },
                beginAtZero: true,
              }
            }
          }
        });
      })
      .catch(() => {
        // Keep default values on error
      });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <section className="py-20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-screen-1200 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-5 sm:p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Harsh Wardhan's Contribution Graph
          </h2>
          <p className="text-gray-400 mb-6">Last 30 days activity</p>
          
          <div className="h-64">
            <canvas ref={chartRef}></canvas>
          </div>
        </motion.div>

        {/* Contribution Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
        >
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-neon-red mb-2">{totalContributions}</div>
            <div className="text-gray-400 text-sm">Total Contributions</div>
          </div>
          <div className="glass-card p-6 text-center relative">
            <div className="absolute inset-0 border-l border-r border-white/10"></div>
            <div className="text-3xl font-bold text-neon-orange mb-2">{currentStreak}</div>
            <div className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <span>Current Streak</span>
              <span>🔥</span>
            </div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-neon-green mb-2">{longestStreak}</div>
            <div className="text-gray-400 text-sm">Longest Streak</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
