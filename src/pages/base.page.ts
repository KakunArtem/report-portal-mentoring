import {envConfig, logger} from "../configs";
import {Page} from "playwright";

export class BasePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openPage(url: string) {
        logger.info(`open page: ${url}`)
        await this.page.goto(url);
    }

    async openHomePage() {
        await this.openPage(envConfig.baseUrl);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}