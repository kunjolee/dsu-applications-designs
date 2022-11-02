// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    testEnvironment: 'jest-environment-jsdom',
    moduleDirectories: ['node_modules', '<rootDir>/'],
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!<rootDir>/out/**',
        '!<rootDir>/.next/**',
        '!<rootDir>/pages/api/**',
        '!<rootDir>/pages/_app.tsx/**',
        '!<rootDir>/config/**',
        '!<rootDir>/*.config.ts',
        '!<rootDir>/*.config.js',
        '!<rootDir>/coverage/**',
    ],
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        // https://jestjs.io/docs/webpack#mocking-css-modules
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

        // Handle CSS imports (without CSS modules)
        '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

        // Handle image imports
        // https://jestjs.io/docs/webpack#handling-static-assets
        '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`,

        // Handle module aliases
        '^@/components/(.*)$': '<rootDir>/components/$1',

        '^@/pages/(.*)$': '<rootDir>/pages/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    collectCoverage: true,
    coverageProvider: 'v8',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

// module.exports = {
//     collectCoverageFrom: [
//         '**/*.{js,jsx,ts,tsx}',
//         '!**/*.d.ts',
//         '!**/node_modules/**',
//         '!<rootDir>/out/**',
//         '!<rootDir>/.next/**',
//         '!<rootDir>/pages/api/**',
//         '!<rootDir>/pages/_app.tsx/**',
//         '!<rootDir>/config/**',
//         '!<rootDir>/*.config.ts',
//         '!<rootDir>/*.config.js',
//         '!<rootDir>/coverage/**',
//     ],
//     moduleNameMapper: {
//         // Handle CSS imports (with CSS modules)
//         // https://jestjs.io/docs/webpack#mocking-css-modules
//         '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

//         // Handle CSS imports (without CSS modules)
//         '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

//         // Handle image imports
//         // https://jestjs.io/docs/webpack#handling-static-assets
//         '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`,

//         // Handle module aliases
//         '^@/components/(.*)$': '<rootDir>/components/$1',

//         '^@/pages/(.*)$': '<rootDir>/pages/$1',
//     },
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
//     transform: {
//         // Use babel-jest to transpile tests with the next/babel preset
//         // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
//         '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
//     },
//     preset: 'ts-jest',
//     transformIgnorePatterns: [
//         '/node_modules/',
//         '^.+\\.module\\.(css|sass|scss)$',
//     ],
//     testEnvironment: 'jest-environment-jsdom',
//     collectCoverage: true,
//     coverageProvider: 'v8',
// };
