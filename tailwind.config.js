/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        secondary: '#164e63',
        accent: '#6b21a8',
        danger: '#6b21a8',
        dark: '#111827',
      },
      animation: {
        slideDown: 'slideDown 0.45s ease-out',
        slideInLeft: 'slideInLeft 0.4s ease-out',
        fadeIn: 'fadeIn 0.5s ease-out',
        scaleIn: 'scaleIn 0.3s ease',
        slideInUp: 'slideInUp 0.8s ease-out',
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 1.5s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        slideInDown: 'slideInDown 0.6s ease-out',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        bounceIn: 'bounceIn 0.8s ease-out',
        rotateIn: 'rotateIn 0.6s ease-out',
        zoomIn: 'zoomIn 0.5s ease-out',
        typewriter: 'typewriter 3s steps(40, end) forwards',
      },
      keyframes: {
        slideDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-12px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        scaleIn: {
          from: {
            transform: 'translateX(-50%) scale(0)',
          },
          to: {
            transform: 'translateX(-50%) scale(1)',
          },
        },
        slideInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotateIn: {
          from: { opacity: '0', transform: 'rotate(-180deg) scale(0)' },
          to: { opacity: '1', transform: 'rotate(0deg) scale(1)' },
        },
        zoomIn: {
          from: { opacity: '0', transform: 'scale(0.5)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};
