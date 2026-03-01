import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harsh Wardhan| Full-Stack & AI Engineer',
  description: 'Building scalable systems and intelligent applications with modern technologies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-white antialiased">
        {/* Background effects */}
        <div className="grid-overlay"></div>
        <div className="radial-blob radial-blob-1"></div>
        <div className="radial-blob radial-blob-2"></div>
        
        {/* Light streaks */}
        <div className="light-streak" style={{ left: '10%', animationDelay: '0s' }}></div>
        <div className="light-streak" style={{ left: '30%', animationDelay: '2s' }}></div>
        <div className="light-streak" style={{ left: '50%', animationDelay: '4s' }}></div>
        <div className="light-streak" style={{ left: '70%', animationDelay: '6s' }}></div>
        <div className="light-streak" style={{ left: '90%', animationDelay: '1s' }}></div>
        
        {children}
      </body>
    </html>
  );
}
