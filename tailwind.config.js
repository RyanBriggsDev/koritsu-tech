/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4A90E2", // Soft blue
          secondary: "#F5F5F5", // Light off-white
          accent: "#67C23A", // Fresh green
          neutral: "#3D4451", // Dark gray
          "base-100": "#FFFFFF", // White
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          error: "#FF5252",
        },
      },
      {
        dark: {
          primary: "#4A90E2", // Keep the same blue
          secondary: "#2A2B2E", // Darker shade for dark mode
          accent: "#67C23A", // Keep the same green
          neutral: "#D1D5DB", // Light gray for text in dark mode
          "base-100": "#1F2937", // Dark background
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          error: "#FF5252",
        },
      },
    ],
  },
};
