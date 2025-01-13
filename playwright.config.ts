import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 1,
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        }
    ],
    reporter: [
        ['allure-playwright'],
    ],
    workers: 4
});