module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
    reporters: [
        'default',
        ['jest-html-reporter', {
            pageTitle: 'Test Report',
            outputPath: './reports/test-report.html',
            includeFailureMsg: true,
            includeConsoleLog: true,
        }],
    ],
};