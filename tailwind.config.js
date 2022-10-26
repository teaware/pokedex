module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js"],
  options: {
    safelist: [
      "bg-red-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-blue-400",
      "bg-purple-400",
      "bg-pink-400",
    ],
  },
  darkMode: "media",
  theme: {
    extend: {
      screens: {
        xs: "376px",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
        },
      },
      animation: {
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  variants: {},
  plugins: [],
};
