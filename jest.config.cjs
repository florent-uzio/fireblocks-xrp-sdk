/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: ["**/?(*.)+(spec|test).[t]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/examples/"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/examples/",
    "<rootDir>/src/FireblocksXrpSdk.ts",
  ],
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  bail: 1,
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          module: "ESNext",
          target: "ES2022",
          moduleResolution: "node",
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
        },
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(xrpl|@fireblocks/ts-sdk)/)"],
}

module.exports = config
