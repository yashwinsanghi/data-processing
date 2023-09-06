// AI Generated
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  clearMocks: true,
  testEnvironment: "node",
  coverageReporters: ["text-summary", "html"],
  collectCoverageFrom: ["src/**/*.ts"],
  moduleDirectories: ["node_modules", "src"],
};

export default config;
