'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
}

type CommandHandler = string | (() => string | void);

interface TerminalProps {
  mode?: 'main' | 'project';
  projectUrl?: string;
  githubUrl?: string;
}

const MAIN_COMMANDS: Record<string, CommandHandler> = {
  help: 'Available commands:\n  help         - Show this help message\n  about        - Navigate to About section\n  skills       - Navigate to Skills section\n  github       - Navigate to GitHub section\n  projects     - Navigate to Projects section\n  achievements - Navigate to Achievements section\n  contact      - Navigate to Contact section\n  whoami       - Display user info\n  ls           - List available sections\n  clear        - Clear terminal\n\nType any command to execute.',
  
  achievements: () => {
    document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to achievements...';
  },

  about: () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to About section...';
  },
  
  skills: () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to Skills section...';
  },
  
  github: () => {
    document.getElementById('github')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to GitHub section...';
  },
  
  projects: () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to Projects section...';
  },
  
  contact: () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to Contact section...';
  },
  
  work: () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to Projects section...';
  },
  
  whoami: 'Harsh Wardhan -Full-stack developer experienced in designing and implementing scalable web systems with modern frontend and backend technologies.',
  
  ls: 'Available sections:\n  about        - About me\n  skills       - Technical skills\n  projects     - My projects\n  achievements - Achievements\n  github       - GitHub stats\n  contact      - Get in touch',
  
  clear: 'CLEAR',
};

export default function Terminal({ mode = 'main', projectUrl, githubUrl }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const commands: Record<string, CommandHandler> = mode === 'project' ? {
    help: 'Available commands:\n  help   - Show this help message\n  live   - Open live demo\n  github - Open GitHub repository',
    
    live: () => {
      const url = projectUrl || 'https://your-live-url.com';
      if (typeof window !== 'undefined') {
        window.open(url, '_blank');
      }
      return 'Opening live demo...';
    },
    
    github: () => {
      const url = githubUrl || 'https://github.com/harshwardhan1507';
      if (typeof window !== 'undefined') {
        window.open(url, '_blank');
      }
      return 'Opening GitHub repository...';
    },
  } : MAIN_COMMANDS;

  // Typing animation for welcome message
  const typeText = useCallback(async (text: string, speed: number = 30): Promise<void> => {
    setIsTyping(true);
    setLines(prev => [...prev, { type: 'output', content: '' }]);
    
    for (let i = 0; i < text.length; i++) {
      if (typingRef.current) clearTimeout(typingRef.current);
      
      await new Promise(resolve => {
        typingRef.current = setTimeout(resolve, speed);
      });
      
      setLines(prev => {
        const newLines = [...prev];
        newLines[newLines.length - 1] = {
          ...newLines[newLines.length - 1],
          content: text.substring(0, i + 1)
        };
        return newLines;
      });
    }
    
    setIsTyping(false);
  }, []);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessages = [
      'Welcome to Haruto OS v1.0',
      'Type \'help\' to see available commands.'
    ];

    const showWelcome = async () => {
      await typeText(welcomeMessages[0], 40);
      await new Promise(resolve => setTimeout(resolve, 500));
      await typeText(welcomeMessages[1], 30);
    };

    showWelcome();

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [typeText]);

  // Blinking cursor animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;

    // Add to history
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add command to output
    setLines(prev => [...prev, { type: 'input', content: `> ${cmd}` }]);

    // Execute command
    if (trimmedCmd === 'clear') {
      setLines([]);
      return;
    }

    const command = commands[trimmedCmd];

    if (command) {
      if (typeof command === 'function') {
        const result = command();
        setTimeout(() => {
          setLines(prev => [
            ...prev,
            {
              type: 'success',
              content: typeof result === 'string' ? result : 'Command executed successfully.',
            },
          ]);
        }, 100);
      } else {
        setTimeout(() => {
          setLines(prev => [...prev, { type: 'output', content: command }]);
        }, 100);
      }
    } else {
      setTimeout(() => {
        setLines(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}. Type 'help' for available commands.` }]);
      }, 100);
    }
  }, [commands]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isTyping) return;
    executeCommand(input);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="terminal-window w-full max-w-3xl mx-auto group"
      onClick={handleContainerClick}
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <span className="text-gray-400 text-sm ml-4">
          {mode === 'project' ? 'project-terminal' : 'haruto-terminal'}
        </span>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="terminal-content h-72 md:h-80 overflow-y-auto overflow-x-hidden scrollbar-thin"
      >
        {lines.map((line, index) => (
          <div key={index} className="mb-1 whitespace-pre-wrap">
            {line.type === 'input' && (
              <span className="text-neon-red">{line.content}</span>
            )}
            {line.type === 'output' && (
              <span className="text-neon-green">{line.content}</span>
            )}
            {line.type === 'error' && (
              <span className="text-red-400">{line.content}</span>
            )}
            {line.type === 'success' && (
              <span className="text-neon-orange">{line.content}</span>
            )}
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-neon-red mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-neon-green font-mono caret-transparent"
            spellCheck={false}
            autoComplete="off"
          />
          {showCursor && !isTyping && (
            <span className="inline-block w-2.5 h-5 bg-neon-green animate-pulse" />
          )}
        </form>

        {/* Hint for project mode */}
        {mode === 'project' && lines.length === 0 && (
          <div className="text-gray-500 text-sm mt-2">
            Type 'live' or 'github' to view project
          </div>
        )}
      </div>
    </motion.div>
  );
}
