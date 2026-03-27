"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setFormState("loading");

    try {
      const res = await fetch("https://formspree.io/f/xaqppjzp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch (err) {
      console.error(err);
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 sm:px-6 bg-black/50 backdrop-blur-sm">
      <div className="max-w-[700px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">{"<Contact/>"}</span>
          </h2>
          <p className="text-zinc-400">
            Open to internships, collabs, and freelance work. I usually reply
            within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          <a
            href="mailto:harshwardhansingh1507@gmail.com"
            className="flex w-full sm:w-auto items-center gap-2 px-4 py-2 border border-zinc-700 rounded-lg text-zinc-300 hover:border-blue-400 hover:text-blue-400 transition-colors text-sm font-mono break-all"
          >
            <Mail size={15} />
            harshwardhansingh1507@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/harsh-wardhan-singh-cse"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:w-auto items-center gap-2 px-4 py-2 border border-zinc-700 rounded-lg text-zinc-300 hover:border-blue-400 hover:text-blue-400 transition-colors text-sm font-mono"
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
          <a
            href="https://github.com/harshwardhan1507"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:w-auto items-center gap-2 px-4 py-2 border border-zinc-700 rounded-lg text-zinc-300 hover:border-purple-400 hover:text-purple-400 transition-colors text-sm font-mono"
          >
            <Github size={15} />
            GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 font-mono"
        >
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-zinc-500 text-xs ml-2">contact-form.sh</span>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-green-400 text-sm block mb-1">
                {`>`} name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-green-400 transition-colors placeholder-zinc-600"
              />
            </div>

            <div>
              <label className="text-green-400 text-sm block mb-1">
                {`>`} email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-green-400 transition-colors placeholder-zinc-600"
              />
            </div>

            <div>
              <label className="text-green-400 text-sm block mb-1">
                {`>`} message:
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={5}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-green-400 transition-colors placeholder-zinc-600 resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={formState === "loading"}
              className="w-full py-3 rounded-lg font-semibold text-sm transition-all bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState === "loading" ? "Sending..." : "$ send_message →"}
            </button>

            {formState === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 text-sm text-center"
              >
                ✅ Message sent! I will get back to you soon.
              </motion.p>
            )}

            {formState === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                ❌ Something went wrong. Email me directly instead.
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
