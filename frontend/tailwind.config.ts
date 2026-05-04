import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
        
        secondary: 'var(--color-secondary)',
        'secondary-dark': 'var(--color-secondary-dark)',
        'secondary-light': 'var(--color-secondary-light)',
        
        tertiary: 'var(--color-tertiary)',
        'tertiary-dark': 'var(--color-tertiary-dark)',
        'tertiary-light': 'var(--color-tertiary-light)',
        
        quaternary: 'var(--color-quaternary)',
        'quaternary-dark': 'var(--color-quaternary-dark)',
        'quaternary-light': 'var(--color-quaternary-light)',

        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: [
          'Georgia',
          'Times New Roman',
          'Times',
          'serif',
        ],
      },
      spacing: {
        'section': '5rem',
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
