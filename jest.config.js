/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',

  testEnvironment: 'jsdom',

  rootDir: './src',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  setupFilesAfterEnv: ['<rootDir>/__tests__/setupTests.ts'],

  testMatch: ['**/__tests__/(components|pages)/*.(ts|tsx|js|jsx)'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.+\\.svg?$': '<rootDir>/__tests__/mocks/svg.ts',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'test-file-stub',
  },

  transformIgnorePatterns: [
    '/node_modules/(?!(chartjs-adapter-luxon|chart.js|chartjs-chart-financial)/)',
  ],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
