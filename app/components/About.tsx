"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Projects Shipped", value: "10+" },
  { label: "Hackathons", value: "1" },
  { label: "GitHub Repos", value: "6+" },
  { label: "Cups of Coffee", value: "∞" }, // keeps it human
];

const highlights = [
  "🎓 B.Tech CS @ SRM University",
  "⚡ Built MemoryOS in 36 hours at a hackathon",
  "🌐 Full-stack: React · Node.js · Supabase · Firebase",
  "📈 Learning DSA in Java for placements",
  "🎯 Goal: Land a dev internship by 2nd year",
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-zinc-900/30">
      <div className="max-w-[1200px] mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">{"<About/>"}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — bio + highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Bio card */}
            <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800">
              <p className="text-zinc-300 leading-relaxed mb-4">
                Hey, I'm{" "}
                <span className="text-white font-semibold">Harsh Wardhan</span>{" "}
                — a 1st year CS student at SRM University and a self-driven
                full-stack developer.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                I build real products, not just tutorial clones. From{" "}
                <span className="text-blue-400">MemoryOS</span> — an AI second
                brain built in 36 hours at a hackathon — to tools used by my own
                college peers, I focus on shipping things that actually work.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Currently leveling up in{" "}
                <span className="text-purple-400">DSA (Java)</span> and backend
                systems, with a goal to land a dev internship by 2nd year. Open
                to internships, freelance, and anything interesting.
              </p>
            </div>

            {/* Quick highlights */}
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800">
              <p className="text-green-400 font-mono text-sm mb-4">
                &gt; ./highlights.sh
              </p>
              <ul className="space-y-2">
                {highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="text-zinc-300 text-sm font-mono"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right — stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl text-center border border-zinc-800 hover:border-blue-500/50 transition-colors"
              >
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <p className="text-zinc-500 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}

            {/* CTA card — spans full width */}
            <motion.a
              href="/harsh_wardhan_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="col-span-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                         border border-blue-500/30 hover:border-blue-400 
                         p-5 rounded-xl text-center cursor-pointer transition-all
                         hover:from-blue-500/20 hover:to-purple-500/20 group"
            >
              <p className="text-white font-semibold group-hover:text-blue-300 transition-colors">
                📄 View Resume
              </p>
              <p className="text-zinc-500 text-xs mt-1">
                Open to internships & freelance
              </p>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
