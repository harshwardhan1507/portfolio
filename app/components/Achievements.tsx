'use client';

import { motion } from 'framer-motion';

const achievements = [
  {
    icon: '🏆',
    title: 'Smart India Hackathon 2024',
    subtitle: 'College Level Qualifier',
    description:
      'Cleared the internal college-level round of SIH - selected to represent the institution among competitive teams.',
  },
  {
    icon: '🚀',
    title: 'SRM Builds 7.0',
    subtitle: 'Hackathon Participant',
    description:
      "Participated in SRM's flagship hackathon. Built MemoryOS - an AI second brain - in 36 hours with a full auth + database stack.",
  },
  {
    icon: '⚖️',
    title: 'CLAT 2024',
    subtitle: 'National Law Entrance',
    description:
      "Appeared for one of India's most competitive law entrance exams, demonstrating breadth beyond technical fields.",
  },
  {
    icon: '✈️',
    title: 'NDA Written + SSB',
    subtitle: '1 AFSB Dehradun - July 2025',
    description:
      'Cleared the NDA written exam and underwent the 5-day SSB selection process at 1 Air Force Selection Board, Dehradun.',
  },
  {
    icon: '🎯',
    title: 'Memocracy Finalist',
    subtitle: 'SRM University Event',
    description:
      'Reached the finals as a wildcard entry - competing without a formal qualification round.',
  },
];

export default function Achievements() {
  const featuredCards = achievements.slice(0, 4);
  const finalCard = achievements[4];

  return (
    <section id="achievements" className="py-20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-screen-1200 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">{'<Achievements/>'}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {featuredCards.map((achievement, index) => (
            <motion.article
              key={achievement.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card glass-card-hover p-6 h-full"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl leading-none">{achievement.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white break-words">{achievement.title}</h3>
                  <p className="text-sm text-neon-blue font-mono mt-1">{achievement.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
            </motion.article>
          ))}

          {finalCard && (
            <motion.article
              key={finalCard.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: featuredCards.length * 0.08 }}
              className="glass-card glass-card-hover p-6 h-full lg:col-span-2 lg:max-w-[560px] lg:justify-self-center"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl leading-none">{finalCard.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white break-words">{finalCard.title}</h3>
                  <p className="text-sm text-neon-blue font-mono mt-1">{finalCard.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">{finalCard.description}</p>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
}
