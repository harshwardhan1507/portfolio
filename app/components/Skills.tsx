'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML', icon: <img src="/icons/html5.svg" className='invert' alt="HTML" width="40" /> },
  { name: 'CSS', icon: <img src="/icons/css.svg" className="invert" alt="CSS" width="40" /> },
  { name: 'JavaScript', icon: <img src="/icons/javascript.svg" className='invert' alt="JavaScript" width="40" /> },
  { name: 'React', icon: <img src="/icons/react.svg" className='invert' alt="React" width="40" /> },
  { name: 'Git', icon: <img src="/icons/git.svg" className='invert' alt="Git" width="40" /> },
  { name: 'Github', icon: <img src="/icons/github.svg" className='invert' alt="Github" width="40" /> },
  { name: 'Node.js', icon: <img src="/icons/nodedotjs.svg" className='invert' alt="Node.js" width="40" /> },
  { name: 'MongoDB', icon: <img src="/icons/mongodb.svg" className='invert' alt="MongoDB" width="40" /> },
  { name: 'Python', icon: <img src="/icons/python.svg" className='invert' alt="Python" width="40" /> },
  { name: 'Next.js', icon: <img src="/icons/nextdotjs.svg" className='invert' alt="Next.js" width="40" /> },
  { name: 'Java', icon: <img src="/icons/java.svg" className='invert' alt="Java" width="40" /> },
  { name: 'C', icon: <img src="/icons/c.svg" className='invert' alt="C" width="40" /> },
  { name: 'C++', icon: <img src="/icons/cplusplus.svg" className='invert' alt="C++" width="40" /> },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-screen-1200 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">{"<Skills/>"}</span>
          </h2>
          <p className="text-xl text-gray-400 font-mono">SYSTEM.LOAD_TECHNOLOGIES()</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="glass-card glass-card-hover p-4 flex flex-col items-center justify-center gap-2 cursor-default"
            >
              <span className="text-3xl">{skill.icon}</span>
              <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
