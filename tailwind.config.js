/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        HelveticaNeueThin: ["Helvetica-Neue-Thin"],
        HelveticaNeueLight: ["Helvetica-Neue-Light"],
        HelveticaNeueItalic: ["Helvetica-Neue-Italic"],
        HelveticaNeueRegular: ["Helvetica-Neue-Regular"],
        HelveticaNeueMedium: ["Helvetica-Neue-Medium"],
        HelveticaNeueBold: ["Helvetica-Neue-Bold"],
        InterMedium: "Inter",
      },
      colors: {
        "slate-600": "#475569",
        "slate-300": "#cbd5e1",
        "slate-400": "#94a3b8",
        "slate-900": "#0f172a",
        "shades-white": "#fff",
        "slate-200": "#e2e8f0",
        "brand-lavendar-dark": "#7487ff",
      },
    },
  },
  plugins: [],
}

