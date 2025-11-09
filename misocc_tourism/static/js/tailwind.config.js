/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.{html,js}",
    "./static/js/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0077B6", // Ocean Blue
          light: "#0096C7",
          dark: "#023E8A",
        },
        secondary: {
          DEFAULT: "#FFD166", // Golden Sand
          light: "#FFE19C",
          dark: "#E6B800",
        },
        accent: {
          DEFAULT: "#118C4F", // Forest Green
          light: "#33A065",
          dark: "#0E6C3F",
        },
        neutral: {
          light: "#F9FAFB",
          DEFAULT: "#E5E7EB",
          dark: "#333333",
        },
        text: {
          DEFAULT: "#1F2937", // Charcoal
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        heading: ["'Poppins'", "sans-serif"],
        serif: ["'Merriweather'", "serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
        },
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.05)",
        medium: "0 8px 24px rgba(0, 0, 0, 0.1)",
        deep: "0 12px 32px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem",
        '3xl': "2rem",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out",
        slideUp: "slideUp 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
};
