import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xsm: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
  corePlugins: {
    container: false,
  },
};

export default config;
