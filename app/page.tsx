"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/Haruto-x-Okura/repos")
      .then((res) => res.json())
      .then((data) => setRepos(data.slice(0, 4)));
  }, []);

  return (
    <main className="bg-black text-white min-h-screen scroll-smooth">
      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4">Hi, I'm Haruto 👋</h1>
        <p className="text-gray-400 max-w-xl">
          Web Developer | Java | Python | React Enthusiast
        </p>
        <a
          href="#projects"
          className="mt-6 px-6 py-3 bg-white text-black rounded-full hover:scale-105 transition"
        >
          View My Work
        </a>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-zinc-900 text-center">
        <h2 className="text-3xl font-semibold mb-6">About Me</h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          I'm a developer passionate about building clean and efficient
          applications. I enjoy solving problems and creating user-friendly
          digital experiences.
        </p>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          GitHub Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-zinc-900 p-6 rounded-xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold">{repo.name}</h3>
              <p className="text-gray-400 text-sm mt-2">
                {repo.description || "No description available."}
              </p>
              <a
                href={repo.html_url}
                target="_blank"
                className="inline-block mt-4 text-blue-400 hover:underline"
              >
                View Repo →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-zinc-900 text-center">
        <h2 className="text-3xl font-semibold mb-6">Contact</h2>
        <p className="text-gray-400">
          Email: yourmail@example.com
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Haruto. All rights reserved.
      </footer>
    </main>
  );
}