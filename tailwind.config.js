/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium terracotta & green palette
        'terra': '#9A3412',
        'terra-dark': '#7D2C0C',
        'terra-light': '#C2410C',
        'accent': '#059669',
        'accent-dark': '#047857',
        'accent-light': '#10B981',
        'cream': '#FFFBEB',
        'cream-dark': '#FEF3C7',
        'charcoal': '#0F172A',
        'charcoal-light': '#64748B',
        'muted': '#F8F2F0',
        'border': '#F2E6E2',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      boxShadow: {
        'premium': '0 4px 15px rgba(154, 52, 18, 0.12)',
        'premium-lg': '0 12px 40px rgba(154, 52, 18, 0.18)',
        'terra-glow': '0 4px 20px rgba(154, 52, 18, 0.2)',
        'accent-glow': '0 4px 20px rgba(5, 150, 105, 0.2)',
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        'body': ['Inter', 'sans-serif'],
        'header': ['Calistoga', 'serif'],
        'display': ['Calistoga', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(5, 150, 105, 0.2)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(5, 150, 105, 0.4)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
