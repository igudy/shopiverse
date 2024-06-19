module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-react", // Adds support for JSX
    "@babel/preset-typescript", // Adds support for TypeScript
  ],
  plugins: [
    // Add any additional Babel plugins you need here
    // For example, to support class properties:
    "@babel/plugin-proposal-class-properties",
    // To support optional chaining and nullish coalescing operators:
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    // To transform async/await to generators for compatibility with older browsers:
    "@babel/plugin-transform-runtime",
    // To enable dynamic imports (e.g., import() syntax)
    "@babel/plugin-syntax-dynamic-import",
  ],
};
