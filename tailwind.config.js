/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Custom max-width breakpoints matching the site's original desktop-first design
    // (base styles = desktop, these variants shrink things down for smaller screens) —
    // named max-* so they're never confused with Tailwind's default min-width screens.
    screens: {
      'max-2xl': { max: '1100px' },
      'max-xl': { max: '900px' },
      'max-lg': { max: '700px' },
      'max-md': { max: '560px' },
      'max-sm': { max: '400px' },
    },
    extend: {
      colors: {
        abyss: '#05141c',
        deep: '#0c2731',
        panel: '#0f2e39',
        teal: {
          DEFAULT: '#1b9187',
          dim: '#144e4a',
        },
        amber: '#e8a33d',
        foam: '#eaf5f3',
        mist: '#8fa9ae',
        line: 'rgba(234,245,243,0.10)',
        danger: '#e2685c',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        site: '1180px',
      },
      backdropBlur: {
        nav: '10px',
      },
    },
  },
  plugins: [],
};
