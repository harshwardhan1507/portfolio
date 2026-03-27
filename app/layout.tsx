import './globals.css';
import type { Metadata } from 'next';

// Import ClickSpark for interactive click effects
import ClickSpark from './components/ClickSpark';
import HyperspeedBackground from '../components/Hyperspeed/HyperspeedBackground';

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
      {/* 
        Main body with background color fallback.
        The Particles component will render the animated background.
      */}
      <body className="bg-black text-white antialiased">
        <HyperspeedBackground />
        
        {/* 
          ========================================
          CLICK SPARK EFFECT
          ========================================
          Wraps content and creates sparkling particle effects 
          on mouse clicks for interactive feedback.
          Props: sparkColor, sparkSize, sparkRadius, sparkCount, 
                 duration, easing, extraScale
          ========================================
        */}
        
        <ClickSpark 
          sparkColor="#ff2a2a"
          sparkCount={8}
          sparkSize={10}
          sparkRadius={15}
          duration={400}
        >
          {/* Main content rendered with click spark effects */}
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
