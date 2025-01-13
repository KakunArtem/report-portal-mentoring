import {After, AfterAll, Before, BeforeAll, setDefaultTimeout} from '@cucumber/cucumber';
import {Browser, BrowserContext, chromium, Page} from 'playwright';
import {envConfig, logger} from '../src/configs';

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
    logger.info('Launching browser...');
    browser = await chromium.launch({headless: envConfig.headless});
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
    this.page = page;
});

After(async function () {
    await page.close();
    await context.close();
});

AfterAll(async () => {
    logger.info('Closing browser...');
    await browser.close();
    logger.info('Browser closed.');
});

export {page};