/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        primary: '#001E37', // oxford-blue
        'berkeley-blue': '#00325B',
        'indigo-dye': '#004782',
        'giants-orange': '#F46125',
        'mikado-yellow': '#FDC500',
        'byzantine-blue': '#114ED1',
        paragraph: '#1E293B',
        'button-primary': '#001E37',
        neutral: '#E2E8F0',
        cta: '#F46125', // using giants-orange for CTA
      },
      fontFamily: {
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
}