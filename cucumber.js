module.exports = {
    default: {
        paths: ['tests/features/**/*.feature'],
        requireModule: ['ts-node/register'],
        require: ['tests/hooks.ts', 'tests/steps/**/*.ts'],
        format: ["allure-cucumberjs/reporter"],
        formatOptions: {
            resultsDir: 'allure-results'
        }
    },
    parallel: 3
};