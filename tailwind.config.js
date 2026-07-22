/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        bg: {
          light: '#FFFFFF',
          alt:   '#FBF6E8',
          dark:  '#1c1008',
          'dark-alt': '#251608',
        },
        text: {
          primary:   '#3A2418',
          secondary: '#5C3D2C',
          muted:     '#8A6858',
          'dark-primary':   '#FBF6E8',
          'dark-secondary': '#D4B896',
          'dark-muted':     '#9A7A60',
        },
        accent: {
          DEFAULT: '#B02618',
          hover:   '#8A1C10',
        },
        border: {
          light: 'rgba(58, 36, 24, 0.2)',
          dark:  'rgba(245, 222, 143, 0.12)',
        },
        divider: {
          light: 'rgba(58, 36, 24, 0.08)',
          dark:  'rgba(245, 222, 143, 0.07)',
        },
        surface: {
          light: '#FFFFFF',
          dark:  '#2d1c0d',
          '2-light': '#FBF6E8',
          '2-dark': '#3a2418',
        },
        navbar: {
          light: 'rgba(255, 255, 255, 0.92)',
          dark:  'rgba(28, 16, 8, 0.90)',
        },
        footer: {
          bg: '#3A2418',
          text: '#F5DE8F',
        },
        brand: {
          sage:      '#B02618',
          sagelight: '#F5DE8F',
          slate:     '#3A2418',
          softwhite: '#FFFFFF',
          blue:      '#3A2418',
          yellow:    '#F5DE8F',
          orange:    '#B02618',
          red:       '#B02618',
          mauve:     '#3A2418',
        }
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },

      fontSize: {
        'xs':   ['1.1875rem',  { lineHeight: '1rem' }], /* 19px */
        'sm':   ['1.28125rem', { lineHeight: '1.25rem' }], /* 20.5px */
        'base': ['1.375rem',   { lineHeight: '1.6' }], /* 22px */
        'md':   ['1.46875rem', { lineHeight: '1.7' }], /* 23.5px */
        'lg':   ['1.5625rem',  { lineHeight: '1.75rem' }], /* 25px */
        'xl':   ['1.75rem',    { lineHeight: '2rem' }], /* 28px */
        '2xl':  ['2.03125rem', { lineHeight: '2.25rem' }], /* 32.5px */
        '3xl':  ['2.3125rem',  { lineHeight: '1.2' }], /* 37px */
        '4xl':  ['2.875rem',   { lineHeight: '1.2' }], /* 46px */
        '5xl':  ['3.4375rem',  { lineHeight: '1.2' }], /* 55px */

        /* Specific hardcoded font sizes used across modules */
        '11': ['0.6875rem', { lineHeight: '1.5' }],
        '12': ['0.75rem', { lineHeight: '1.5' }],
        '13': ['0.8125rem', { lineHeight: '1.5' }],
        '14': ['0.875rem', { lineHeight: '1.5' }],
        '15': ['0.9375rem', { lineHeight: '1.5' }],
        '16': ['1rem', { lineHeight: '1.5' }],
        '20': ['1.25rem', { lineHeight: '1.5' }],
        '23': ['1.4375rem', { lineHeight: '1.5' }],
        '32': ['2rem', { lineHeight: '1.5' }],
      },

      spacing: {
        '0.5': '0.125rem',
        '0.75': '0.1875rem', /* 3px */
        '1.5': '0.375rem', /* 6px */
        '2.25': '0.5625rem', /* 9px */
        '3': '0.75rem', /* 12px */
        '3.75': '0.9375rem', /* 15px */
        '4.5': '1.125rem', /* 18px */
        '6': '1.5rem', /* 24px */
        '7.5': '1.875rem', /* 30px */
        '9': '2.25rem', /* 36px */
        '12': '3rem', /* 48px */
        '15': '3.75rem', /* 60px */
        '18': '4.5rem', /* 72px */

        /* Custom Pixel Spacings mapped to rem */
        '1px': '0.0625rem',
        '2px': '0.125rem',
        '4px': '0.25rem',
        '5px': '0.3125rem',
        '7px': '0.4375rem',
        '8px': '0.5rem',
        '10px': '0.625rem',
        '14px': '0.875rem',
        '16px': '1rem',
        '20px': '1.25rem',
        '32px': '2rem',
        '40px': '2.5rem',
        '64px': '4rem',
        '80px': '5rem',
        '96px': '6rem',
      },

      borderRadius: {
        'sm':  '0.375rem',
        'md':  '0.75rem',
        'lg':  '1.125rem',
        'xl':  '1.5rem',
        '2xl': '1.875rem',
        'pill':'9999px',
      },

      boxShadow: {
        'clay-sm': '0 4px 12px rgba(58, 36, 24, 0.05), 0 0 0 1px rgba(58, 36, 24, 0.10)',
        'clay':    '0 8px 24px rgba(58, 36, 24, 0.07), 0 0 0 1px rgba(58, 36, 24, 0.10)',
        'clay-lg': '0 16px 40px rgba(176, 38, 24, 0.12), 0 0 0 1px rgba(176, 38, 24, 0.20)',
        'navbar':  '0 4px 20px rgba(58, 36, 24, 0.06), 0 1px 0 rgba(58, 36, 24, 0.05)',
        'card':    '0 4px 24px rgba(58, 36, 24, 0.06)',
        'card-hover': '0 12px 40px rgba(58, 36, 24, 0.10)',
        'project-1': '0 4px 12px rgba(58, 36, 24, 0.08)',
        'project-2': '0 4px 14px rgba(58, 36, 24, 0.12)',
        'project-3': '0 4px 14px rgba(176, 38, 24, 0.15)',
        'project-4': '0 6px 20px rgba(176, 38, 24, 0.22)',
        'achiev-1': '0 8px 16px rgba(58, 36, 24, 0.12)',
        'about-1': '0 4px 12px rgba(58, 36, 24, 0.10)',
        'about-2': '0 4px 14px rgba(58, 36, 24, 0.16)',
        'about-3': '0 8px 25px rgba(58, 36, 24, 0.18)',
        'github-1': '0 4px 16px rgba(58, 36, 24, 0.10)',
        'github-2': '0 8px 24px rgba(58, 36, 24, 0.18)',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
      },

      screens: {
        'xs': '480px',
        'sm': '600px',
        'md': '768px',
        'lg': '900px',
        'xl': '1024px',
        // Zoom-immune variant for the Services bento grid: activates at the
        // same real width as `xl` (1024px) for genuine small/touch devices,
        // OR whenever the device is mouse + hover capable (i.e. an actual
        // desktop/laptop) — a signal browser zoom cannot change, unlike
        // viewport width. Keeps the 3-column bento layout stable across
        // 70%-110% zoom on any real desktop, without affecting phones/tablets.
        'bento': { raw: '(min-width: 1024px), (hover: hover) and (pointer: fine)' },
      },

      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marqueeLeft: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20vw)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseSplit: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        dropIn: {
          '0%': { transform: 'translateY(-120vh)' },
          '100%': { transform: 'translateY(0)' },
        },
        riseIn: {
          '0%': { transform: 'translateY(120vh)' },
          '100%': { transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        flyInBubble: {
          '0%': { opacity: '0', transform: 'translate(var(--sx, 0vw), var(--sy, 0vh))' },
          '100%': { opacity: '0.85', transform: 'translate(var(--tx, 0px), var(--ty, 0px))' },
        },
        flyOutBubble: {
          '0%': { opacity: '0.85', transform: 'translate(var(--tx, 0px), var(--ty, 0px)) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(var(--tx, 0px), var(--ty, 0px)) scale(0)' },
        }
      },

      animation: {
        'fade-up':       'fadeUp 500ms cubic-bezier(0.22,1,0.36,1) both',
        'marquee-left':  'marqueeLeft 35s linear infinite',
        'marquee-right': 'marqueeRight 35s linear infinite',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-split':   'pulseSplit 0.9s ease both',
        'drop-in':       'dropIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0ms) both',
        'rise-in':       'riseIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0ms) both',
        'pop-in':        'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0ms) both',
        'fly-in-bubble': 'flyInBubble 1200ms cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms) both',
        'fly-out-bubble':'flyOutBubble 600ms ease-out forwards',
      },

    },
  },
  plugins: [],
}
