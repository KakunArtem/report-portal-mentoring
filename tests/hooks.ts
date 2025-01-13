import {Browser, chromium, Page} from 'playwright';
import {envConfig, logger} from "../src/configs";

let browser: Browser;
let page: Page;

export const setupBrowser = () => {
    beforeAll(async () => {
        logger.info('launching browser...');
        browser = await chromium.launch({headless: envConfig.headless});
        page = await browser.newPage();
        logger.info('browser launched');
    });

    afterAll(async () => {
        await browser.close();
        logger.info('browser closed');
    });

    return {getPage: (): Page => page, getBrowser: (): Browser => browser};
};