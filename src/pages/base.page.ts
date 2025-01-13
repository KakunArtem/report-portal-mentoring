import {envConfig, logger} from '../configs';
import {Page} from 'playwright';
import {Sidebar} from './components/sidebar';

export class BasePage {
    protected page: Page;
    protected sideBar: Sidebar;

    constructor(page: Page) {
        this.page = page;
        this.sideBar = new Sidebar(this.page);
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

    getSideBar() {
        return this.sideBar;
    }
}