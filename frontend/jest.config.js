// module.exports = {
//   testEnvironment: "jest-environment-jsdom",
//   transform: {
//     "^.+\\.jsx?$": "babel-jest",
//     "^.+\\.tsx?$": "babel-jest",
//   },
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//   },
//   setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
// };
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
};
