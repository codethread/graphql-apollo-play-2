const commonIgnore = [
  'node_modules',
  'temp',
  'build',
  'reports',
  'dist',
  'public',
  'client/src/graphql.ts',
  'server/src/schema/resolvers-types.ts',
];

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest.projects[number]} */
const unitTests = {
  modulePathIgnorePatterns: commonIgnore.concat('e2e'),
  preset: 'ts-jest',
  clearMocks: true,
  moduleNameMapper: {
    '^@shared(.*)$': '<rootDir>/shared/$1',
    '^@client(.*)$': '<rootDir>/client/$1',
    '^@electron(.*)$': '<rootDir>/electron/$1',
    '^@test/(.*)$': '<rootDir>/testHelpers/$1',
    'package.json': '<rootDir>/package.json',
  },
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: process.cwd(),
  coverageDirectory: '<rootDir>/reports',
  maxWorkers: '80%',
  projects: [
    {
      ...unitTests,
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/?(*.)+(spec|test).ts'],
      // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    },
    // {
    //   ...unitTests,
    //   displayName: 'ui',
    //   testEnvironment: 'jsdom',
    //   testMatch: ['**/?(*.)+(spec|test).tsx'],
    //   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // },
  ],
};
