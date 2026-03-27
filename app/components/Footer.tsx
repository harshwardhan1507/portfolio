'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10">
      <div className="max-w-screen-1200 mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="text-gray-500 text-sm break-words">
            © {currentYear} Harsh Wardhan. Built with Next.js, React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
