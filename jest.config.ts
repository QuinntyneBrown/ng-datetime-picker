import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/projects/ng-datetime-picker/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: [
    'projects/ng-datetime-picker/src/**/*.ts',
    '!projects/ng-datetime-picker/src/public-api.ts',
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^ng-datetime-picker$': '<rootDir>/projects/ng-datetime-picker/src/public-api.ts',
  },
};

export default config;
