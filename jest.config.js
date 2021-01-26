module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "<rootDir>/test/setup.js" 
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  }
}