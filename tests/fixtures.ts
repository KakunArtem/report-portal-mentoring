import {Browser, BrowserContext, chromium, expect, Page, test as base} from '@playwright/test';
import {envConfig, logger} from "../src/configs";

type Fixtures = {
    browser: Browser;
    context: BrowserContext;
    page: Page;
};

const test = base.extend<Fixtures>({
    browser: async ({}: any, use: (arg0: Browser) => any) => {
        logger.info('Launching browser...');
        const browser = await chromium.launch({headless: envConfig.headless});
        await use(browser);
        logger.info('Browser closed.');
        await browser.close();
    },

    context: async ({browser}, use) => {
        const context = await browser.newContext();
        await use(context);
        await context.close();
    },

    page: async ({context}, use) => {
        const page = await context.newPage();
        await use(page);
        await page.close();
    },
});

export {test, expect};