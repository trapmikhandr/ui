/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  transform: {
    // --- 👇 MATCH .css.ts FILES FIRST 👇 ---
    // This more specific rule must come first.
    "\\.css\\.ts$": "@vanilla-extract/jest-transform",

    // --- 👇 THEN MATCH ALL OTHER .ts/.tsx FILES 👇 ---
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        // Tell ts-jest to use the package tsconfig.
        tsconfig: "tsconfig.json",
      },
    ],
  },
};
