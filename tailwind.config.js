/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
   	extend: {
   		colors: {
   			bg: {
   				primary: '#0b0f14',
   				secondary: '#0d1117'
   			},
   			neon: {
   				red: '#ff102a',
   				orange: '#eb6a2e',
   				green: '#39ff14'
   			},
   			background: 'hsl(var(--background))',
   			foreground: 'hsl(var(--foreground))',
   			card: {
   				DEFAULT: 'hsl(var(--card))',
   				foreground: 'hsl(var(--card-foreground))'
   			},
   			popover: {
   				DEFAULT: 'hsl(var(--popover))',
   				foreground: 'hsl(var(--popover-foreground))'
   			},
   			primary: {
   				DEFAULT: 'hsl(var(--primary))',
   				foreground: 'hsl(var(--primary-foreground))'
   			},
   			secondary: {
   				DEFAULT: 'hsl(var(--secondary))',
   				foreground: 'hsl(var(--secondary-foreground))'
   			},
   			muted: {
   				DEFAULT: 'hsl(var(--muted))',
   				foreground: 'hsl(var(--muted-foreground))'
   			},
   			accent: {
   				DEFAULT: 'hsl(var(--accent))',
   				foreground: 'hsl(var(--accent-foreground))'
   			},
   			destructive: {
   				DEFAULT: 'hsl(var(--destructive))',
   				foreground: 'hsl(var(--destructive-foreground))'
   			},
   			border: 'hsl(var(--border))',
   			input: 'hsl(var(--input))',
   			ring: 'hsl(var(--ring))',
   			chart: {
   				'1': 'hsl(var(--chart-1))',
   				'2': 'hsl(var(--chart-2))',
   				'3': 'hsl(var(--chart-3))',
   				'4': 'hsl(var(--chart-4))',
   				'5': 'hsl(var(--chart-5))'
   			}
   		},
   		maxWidth: {
   			'screen-1200': '1200px'
   		},
   		fontFamily: {
   			sans: [
   				'Inter',
   				'-apple-system',
   				'BlinkMacSystemFont',
   				'Segoe UI',
   				'Roboto',
   				'sans-serif'
   			],
   			mono: [
   				'Fira Code',
   				'Monaco',
   				'Consolas',
   				'monospace'
   			]
   		},
   		animation: {
   			'light-streak': 'lightStreak 8s ease-in-out infinite',
   			'fade-in': 'fadeIn 0.6s ease-out forwards',
   			'slide-up': 'slideUp 0.6s ease-out forwards',
   			float: 'float 3s ease-in-out infinite'
   		},
   		keyframes: {
   			lightStreak: {
   				'0%': {
   					transform: 'translateY(-100%)',
   					opacity: '0'
   				},
   				'10%': {
   					opacity: '0.3'
   				},
   				'90%': {
   					opacity: '0.3'
   				},
   				'100%': {
   					transform: 'translateY(100vh)',
   					opacity: '0'
   				}
   			},
   			fadeIn: {
   				'0%': {
   					opacity: '0'
   				},
   				'100%': {
   					opacity: '1'
   				}
   			},
   			slideUp: {
   				'0%': {
   					opacity: '0',
   					transform: 'translateY(30px)'
   				},
   				'100%': {
   					opacity: '1',
   					transform: 'translateY(0)'
   				}
   			},
   			float: {
   				'0%, 100%': {
   					transform: 'translateY(0)'
   				},
   				'50%': {
   					transform: 'translateY(-10px)'
   				}
   			}
   		},
   		borderRadius: {
   			lg: 'var(--radius)',
   			md: 'calc(var(--radius) - 2px)',
   			sm: 'calc(var(--radius) - 4px)'
   		}
   	}
  },
  plugins: [require("tailwindcss-animate")],
}
