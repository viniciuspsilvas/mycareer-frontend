// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ['node_modules', '<rootDir>/'],

    // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
    // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
    // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
    // For example:

    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
        "@lib/(.*)": "<rootDir>/src/lib/$1",
        "@i18n/(.*)": "<rootDir>/i18n/$1",
        "@components/(.*)": "<rootDir>/src/components/$1"
    },
    modulePathIgnorePatterns: ['<rootDir>/infra/', '<rootDir>/src/lib/', '<rootDir>/src/generated/', '<rootDir>/pages/api/'],
    testEnvironment: 'jest-environment-jsdom',
    coveragePathIgnorePatterns: ['<rootDir>/src/apis/'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', 'pages/**/*.{ts,tsx}',
        '!src/**/*.{types,stories,constants,test,spec}.{ts,tsx}',
        '!pages/_app.tsx',
        '!pages/**/*.{types,stories,constants,test,spec}.{ts,tsx}']
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)