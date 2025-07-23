module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/src/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
};
