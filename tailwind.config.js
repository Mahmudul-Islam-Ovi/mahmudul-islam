/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#05060a",
        panel: "#0a0d14",
        neon: "#00ff9c",
        cyan: "#00e5ff",
        violet: "#8b5cf6",
        pink: "#ff2bd6",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        rgb: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        blink: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rgb: "rgb 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        scan: "scan 7s linear infinite",
        spinSlow: "spinSlow 8s linear infinite",
      },
    },
  },
  plugins: [],
};
